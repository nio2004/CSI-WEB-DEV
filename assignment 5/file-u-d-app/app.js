const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  // Render the home page with file upload and download options.
  res.render('home', { username: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // In a real application, you would check the user's credentials against a database.
    // For simplicity, this example checks against the in-memory array.
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (user) {
      req.session.user = username;
      res.redirect('/');
    } else {
      // Add an error message for invalid credentials.
      res.render('login', { error: 'Invalid username or password' });
    }
  });
  
  

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

app.get('/download/:file', (req, res) => {
  const file = path.join(__dirname, 'public/uploads/', req.params.file);
  res.download(file);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const users = []; // In-memory user storage (for demonstration purposes)

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // In a real application, you would perform user validation and store user data in a database.
  // For simplicity, this example uses an in-memory array.
  users.push({ username, password });

  res.redirect('/login');
});
