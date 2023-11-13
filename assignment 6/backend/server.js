const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 3000;

const secretKey = 'hairyPotter';

const users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/file-auth/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, '../frontend/file-auth/build')));

//handling routes here
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { username, password: hashedPassword };
      users.push(user);
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = users.find((u) => u.username === username);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router;

  const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) return res.status(401).send('Unauthorized');
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).send('Forbidden');
      req.user = user;
      next();
    });
  };

  router.get('/protected', authenticateToken, (req, res) => {
    res.send(`Hello, ${req.user.username}! This is a protected route.`);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/file-auth/build', 'index.html'));
  });