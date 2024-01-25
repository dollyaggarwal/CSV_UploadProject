const multer = require('multer');
const path = require('path');
const File = require('../models/File');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('csvFile');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: CSV files only!');
  }
}

exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (req.file === undefined) {
        res.status(400).json({ error: 'No File Selected!' });
      } else {
        try {
          const newFile = new File({
            fileName: req.file.filename,
            filePath: req.file.path,
          });

          await newFile.save();
          res.status(201).json({ message: 'File uploaded successfully!' });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    }
  });
};
