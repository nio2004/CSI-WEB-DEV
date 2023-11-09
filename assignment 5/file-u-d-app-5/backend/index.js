const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000', { useNewUrlParser: true, useUnifiedTopology: true })
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
