require('dotenv/config');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { database } = require('./database');
const { PassThrough } = require('stream');
const { authenticateMiddleware } = require('./authMiddleware');
const multer = require('multer');
const {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
    sendAccessToken,
  } = require('./tokens.js');
  const { isAuth } = require('./isAuth.js');

const server = express();
server.use(cookieParser());
server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 
server.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

  
server.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = database.find(user => user.username === username );//if user exists
        if(user) throw new Error('User already exists');

        //create hash password
        const hashedPassword = await hash(password, 10);

        //insert user in database
        database.push({
            id: database.length,
            username, 
            password: hashedPassword,
        });
        res.send({ message: 'User created' })
        console.log(database);
    }catch (err) {
        res.send({
          error: `${err.message}`,
        });
      }
});

server.post('/protected', async (req, res) => {
    try {
      const userId = isAuth(req);
      if (userId !== null) {
        res.send({
          data: 'This is protected data.',
        });
      }
    } catch (err) {
      res.send({
        error: `${err.message}`,
      });
    }
  });

server.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        //find username
        const user = database.find(user => user.username === username);
        if(!user) throw new Error('User does not exist');

        //compare crypted password
        const valid = await compare(password, user.password);
        if(!valid) throw new Error('Password not corrrect')

        //creating tokens if user authenticated
        const accessToken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id);

        //store refresh token in db
        user.refreshToken = refreshToken;
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, req, accessToken);
    } catch(err){
        res.send({
            error: `${err.message}`,
          });
    }
})

server.post('/logout', async (req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });

    return res.send({
        message: 'Logged out',
    });
});

//new access token with a refresh token
server.post('/refresh_token', (req, res) => {
    const token = req.cookies.refreshtoken;
    // If we don't have a token in our request
    if (!token) return res.send({ accesstoken: '' });
    // We have a token, let's verify it!
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.send({ accesstoken: '' });
    }
    // token is valid, check if user exist
    const user = database.find(user => user.id === payload.userId);
    if (!user) return res.send({ accesstoken: '' });
    // user exist, check if refreshtoken exist on user
    if (user.refreshtoken !== token)
      return res.send({ accesstoken: '' });
    // token exist, create new Refresh- and accesstoken
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    // update refreshtoken on user in db
    // Could have different versions instead!
    user.refreshtoken = refreshtoken;
    // All good to go, send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
  });
  
  server.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}!`),
  );

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Create multer instance with the storage configuration
  const upload = multer({ storage: storage });
  
  // Endpoint to handle file upload
  server.post('/upload', upload.single('file'), (req, res) => {
    // Access the uploaded file details
    const userId = req.user.userId;

    // Save the file with the associated user ID
    const newFile = new File({
      filename: req.file.filename,
      user: userId,
    });
});

server.get('/user_files', authenticateMiddleware, async (req, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user.userId;

    // Query the database for files associated with the user ID
    const userFiles = await File.find({ user: userId });

    // Respond with the list of files
    res.json({ files: userFiles });
  } catch (error) {
    console.error('Error retrieving user files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});