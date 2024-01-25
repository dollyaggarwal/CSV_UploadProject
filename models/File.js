const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
});

const File = mongoose.model('file', fileSchema);

module.exports = File;
