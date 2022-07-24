const CryptoJs = require('crypto-js');
const User = require('../models/User');

const UpdateUser = async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.ENC_KEY).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Deleted Successfully!!");
    } catch (err) {
        res.status(500).json(err);

    }
}

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const getAllUsers = async(req, res) => {
    const query = req.query.new;
    try {
        const user = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const getStats = async(req, res) => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { UpdateUser, deleteUser, getUser, getAllUsers, getStats };