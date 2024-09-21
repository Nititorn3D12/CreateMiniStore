const express = require('express');
const router = express.Router();
const { getProductsByTerm } = require('../controllers/productsv2'); // ตรวจสอบเส้นทาง

router.get('/products/search/:term', getProductsByTerm);

module.exports = router;
