// userRoutes.js
const express = require('express');
const { registerUser, loginUser, uploadFile, downloadFile } = require('../controller/userController');
const path = require('path');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', uploadFile);
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

module.exports = router;
