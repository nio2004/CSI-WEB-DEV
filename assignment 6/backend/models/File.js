const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
