const router = require('express').Router();
const verifyToken = require('../controller/verifyToken');
const productController = require('../controller/productController');

//Create New Product
router.post('/create', verifyToken.verifyTokenAndAdmin, productController.newProduct);
//Update endpoint
router.put('/:id', verifyToken.verifyTokenAndAdmin, productController.UpdateProduct);
//Delete product endpoint
router.delete('/:id', verifyToken.verifyTokenAndAdmin, productController.deleteProduct);
//Get product by Admin
router.get('/findproduct/:id', productController.getProduct);
//Get All products
router.get('/products', productController.getAllProducts);

module.exports = router;