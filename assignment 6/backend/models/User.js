// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  // Other user fields...
});

const User = mongoose.model('User', userSchema);

module.exports = User;
