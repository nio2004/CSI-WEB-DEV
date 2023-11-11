const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // specify the file name
  },
});
const upload = multer({ storage: storage });

// Session configuration
app.use(session({
  secret: 'your-secret-key', // Change this to a secure random key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../frontend/file-up-dwn/build')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful MongoDB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a Mongoose User Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const fileSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const User = mongoose.model('User', userSchema);
const File = mongoose.model('File', fileSchema);

// Login route
app.post('/login', async (req, res) => {
  console.log('Handling login request');
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // Authentication successful
      req.session.username = username; // Store username in the session
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Register route

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/file-up-dwn/build', 'index.html'));
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Example of handling file uploads using Multer
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    // Create a new instance of the File model with uploadedBy set to the logged-in user's ID
    const newFile = new File({
      filename: file.originalname,
      data: file.buffer,
      uploadedBy: req.session.userId, // Assuming you store the user ID in the session
    });

    // Save the file to the MongoDB database
    await newFile.save();

    // Additional processing or response handling can be added here

    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'File upload failed' });
  }
});



// Serve the React app for specified routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/file-up-dwn/build', 'index.html'));
  req.session.username = username; 
});

app.get('/home', (req, res) => {
    // Ensure that the user is logged in before serving the home page
    if (req.session.username) {
      res.sendFile(path.join(__dirname, '../frontend/file-up-dwn/build', 'index.html'));
    } else {
      // Redirect to the login page if not logged in
      res.redirect('/login');
    }
  });

  app.get('/userFiles', async (req, res) => {
    try {
      const userId = req.session.userId; // Get the user ID from the session
      const userFiles = await File.find({ uploadedBy: userId });
  
      // Send the user's files as a response
      res.json({ files: userFiles });
    } catch (error) {
      console.error('Error retrieving user files:', error);
      res.status(500).json({ message: 'Error retrieving user files' });
    }
  });

// Handle other routes or additional features as needed
