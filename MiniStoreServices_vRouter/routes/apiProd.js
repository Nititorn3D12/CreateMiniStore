const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');  // เช็คว่าทำการ import controllers ถูกต้อง

router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getProducts);

module.exports = router;
