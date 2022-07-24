const CryptoJs = require('crypto-js');
const Cart = require('../models/Cart');

const newCart = async(req, res) => {
    const newCart = new Cart(req.body);
    try {
        const newCarts = await newCart.save();
        res.status(200).json(newCarts);
    } catch (err) {
        res.status(500).json(err);
    }
}

const UpdateCart = async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteCart = async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Deleted Successfully!!");
    } catch (err) {
        res.status(500).json(err);

    }
}

const getCart = async(req, res) => {
    try {
        const Cart = await Cart.findOne({ userId: req.params.userId })

        res.status(200).json(Cart);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const getAllCarts = async(req, res) => {

    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports = { newCart, UpdateCart, deleteCart, getCart, getAllCarts };