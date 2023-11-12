const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: String, 
  mimeType: String,     
  identifier: String,   
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
