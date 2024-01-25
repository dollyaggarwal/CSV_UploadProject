const File = require('../models/File');

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
