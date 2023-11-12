
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: String, // Assuming the file name is stored in the user model
});

const User = mongoose.model('User', userSchema);

module.exports = User;
