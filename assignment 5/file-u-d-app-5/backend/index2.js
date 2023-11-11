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
const storage = multer.memoryStorage(); // Using memory storage for simplicity
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

const User = mongoose.model('User', userSchema);

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
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  // Process the file as needed
  // ...
  res.json({ message: 'File uploaded successfully' });
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

// Handle other routes or additional features as needed
