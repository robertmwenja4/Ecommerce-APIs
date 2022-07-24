const router = require('express').Router();
const verifyToken = require('../controller/verifyToken');
const UserController = require('../controller/UserController');

//Update endpoint
router.put('/:id', verifyToken.verifyTokenAndAuth, UserController.UpdateUser);
//Delete user endpoint
router.delete('/:id', verifyToken.verifyTokenAndAuth, UserController.deleteUser);
//Get user by Admin
router.get('/findUser/:id', verifyToken.verifyTokenAndAdmin, UserController.getUser);
//Get All users
router.get('/users', verifyToken.verifyTokenAndAdmin, UserController.getAllUsers);
//Get Stats
router.get('/stats', verifyToken.verifyTokenAndAdmin, UserController.getStats);

module.exports = router;