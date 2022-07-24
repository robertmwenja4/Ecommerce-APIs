const CryptoJs = require('crypto-js');
const Product = require('../models/Product');

const newProduct = async(req, res) => {
    const newProd = new Product(req.body);
    try {
        const newProducts = await newProd.save();
        res.status(200).json(newProducts);
    } catch (err) {
        res.status(500).json(err);
    }
}

const UpdateProduct = async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product Deleted Successfully!!");
    } catch (err) {
        res.status(500).json(err);

    }
}

const getProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const getAllProducts = async(req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}



module.exports = { newProduct, UpdateProduct, deleteProduct, getProduct, getAllProducts };