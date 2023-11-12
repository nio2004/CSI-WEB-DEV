const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const connectToMongoDB = require('./config/dbconfig');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up sessions
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve registration page by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/user/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Use user routes under the /user path
app.use('/user', userRoutes);

app.get('/user/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user', 'main.js'), {
      headers: {
        'Content-Type': 'text/javascript',
      },
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
