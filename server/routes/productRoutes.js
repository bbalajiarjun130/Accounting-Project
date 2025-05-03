const express = require('express');
const multer = require('multer');
const { importProducts, createProduct } = require('../controllers/productController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), importProducts);
router.post('/create', createProduct);

module.exports = router;