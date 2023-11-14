const User = require('../models/userModel');
const File = require('../models/fileModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname); // Set the file name
  },
});

// Set up multer middleware
const upload = multer({ storage: storage });

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
      // Set profilePicture property
      user.profilePicture = user.username; // Set it to an empty string or initialize based on your requirements

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

    // Check if user is authenticated
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Retrieve the authenticated user from the session
    const user = await User.findById(req.session.user._id);

    // Check if the user object has the save method
    if (!user || !user.save || typeof user.save !== 'function') {
      return res.status(500).json({ message: 'Invalid user object' });
    }

    // Create a new File document
    const file = new File({
      originalName: originalname,
      mimeType: mimetype,
      identifier: filename, // You can use a unique identifier here, like a generated ID
    });

    // Save the file to the database
    await file.save();

    // Update the user's profilePicture field with the file reference
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
  try {
    // Assuming the file identifier is stored in the user's profilePicture field
    const fileId = req.session.user.profilePicture;

    // Retrieve the file information from the database
    const file = await File.findOne({ identifier: fileId });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Construct the file path
    const filePath = path.join(__dirname, '..', 'uploads', file.originalName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Stream the file to the response
      res.download(filePath, file.originalName);
    } else {
      res.status(404).json({ message: 'File not found on the server' });
    }
  } catch (error) {
    console.error('Error during file download:', error);
    res.status(500).json({ message: 'File download failed' });
  }
}

module.exports = { registerUser, loginUser, uploadFile, downloadFile };
