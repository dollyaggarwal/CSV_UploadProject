const express = require('express');
const uploadController = require('../controllers/uploadController');
const router = express.Router();

// Handle POST requests for file uploads
router.post('/', uploadController.uploadFile);

module.exports = router;
