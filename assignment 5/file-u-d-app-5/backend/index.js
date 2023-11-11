const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/file-up-dwn/build', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/file-up-dwn/build', 'index.html'));
});

app.post('/register', async(req, res) =>{
  const { username, password } = req.body;

  try{
    const existingUser = await User.findOne({ username });
    if(existingUser){
        return res.status(400).json({ message: 'username already exists' });
    }

    const newUser = new User({ username, password });

    await newUser.save();
    console.log('User registered succesfully');
    res.status(201).json({ message: 'User registered successfully' });
  }catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/login', async(req, res) =>{
  console.log('Handling login request');
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // Authentication successful
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
// Register a sample user
/*const registerUser = async () => {
  try {
    const newUser = new User({
      username: 'testuser2',
      password: 'testpassword2',
    });

    await newUser.save();
    console.log('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

registerUser();*/
