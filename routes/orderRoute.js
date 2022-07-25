const router = require('express').Router();
const verifyToken = require('../controller/verifyToken');
const OrderController = require('../controller/OrderController');

//Create New Order
router.post('/create', verifyToken.verifyToken, OrderController.newOrder);
//Update endpoint
router.put('/:id', verifyToken.verifyTokenAndAdmin, OrderController.UpdateOrder);
//Delete Order endpoint
router.delete('/:id', verifyToken.verifyTokenAndAdmin, OrderController.deleteOrder);
//Get Order by Admin
router.get('/findOrder/:id', verifyToken.verifyTokenAndAuth, OrderController.getOrder);
//Get All Orders
router.get('/Orders', verifyToken.verifyTokenAndAdmin, OrderController.getAllOrders);
//Stats monthly
router.get('/income', verifyToken.verifyTokenAndAdmin, OrderController.monthIncome);

module.exports = router;