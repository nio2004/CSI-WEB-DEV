const express = require('express');
const { registerUser, loginUser, uploadFile, downloadFile } = require('../controller/userController');
const multer = require('multer'); // Add this line
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

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Use the 'upload' middleware for the '/upload' route
router.post('/upload', upload.single('file'), uploadFile);

router.get('/download', downloadFile);
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

router.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'main.js'), {
    headers: {
      'Content-Type': 'text/javascript',
    },
  });
});

router.get('/download', downloadFile);

module.exports = router;
