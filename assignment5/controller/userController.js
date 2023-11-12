const User = require('../models/userModel');
const File = require('../models/fileModel');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + path.extname(file.originalname)); // Set the file name
  },
});

// Set up multer middleware
const upload = multer({ storage });

async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // Retrieve the authenticated user from the session
      req.session.user = user;

      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
}

async function uploadFile(req, res) {
  try {
    // Assuming Multer middleware has saved the file and added information to req.file
    const { originalname, mimetype, filename } = req.file;

    // Create a new File document
    const file = new File({
      originalName: originalname,
      mimeType: mimetype,
      identifier: filename, // You can use a unique identifier here, like a generated ID
    });

    // Save the file to the database
    await file.save();

    // Update the user's profilePicture field with the file reference
    const user = req.session.user; // Assuming you are using sessions
    user.profilePicture = file.identifier; // or set it to the file ID, depending on your file model structure

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ message: 'File upload failed' });
  }
}


async function downloadFile(req, res) {
  // Download file logic...

  // Simulate file download
  res.download('path/to/your/file.txt');
}

module.exports = { registerUser, loginUser, uploadFile, downloadFile };
