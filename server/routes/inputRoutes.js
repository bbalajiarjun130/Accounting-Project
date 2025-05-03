const express = require('express');
const router = express.Router();
const multer = require('multer');
const inputController = require('../controllers/inputController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload-match', upload.single('file'), inputController.uploadAndMatchCSV);

module.exports = router;