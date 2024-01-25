const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();

router.get('/', fileController.getFiles);

module.exports = router;
