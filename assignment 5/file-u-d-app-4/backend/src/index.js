const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Mongoose User Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register a sample user
const registerUser = async () => {
  try {
    const newUser = new User({
      username: 'testuser',
      password: 'testpassword',
    });

    await newUser.save();
    console.log('User registered successfully');
  } catch (error) {
    console.error(error);
  }
};

registerUser();

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
