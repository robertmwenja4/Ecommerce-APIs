const router = require('express').Router();
const verifyToken = require('../controller/verifyToken');
const cartController = require('../controller/cartController');

//Create New cart
router.post('/create', verifyToken.verifyToken, cartController.newCart);
//Update endpoint
router.put('/:id', verifyToken.verifyTokenAndAuth, cartController.UpdateCart);
//Delete cart endpoint
router.delete('/:id', verifyToken.verifyTokenAndAuth, cartController.deleteCart);
//Get cart by Admin
router.get('/findcart/:userId', verifyToken.verifyTokenAndAuth, cartController.getCart);
//Get All carts
router.get('/carts', verifyToken.verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;