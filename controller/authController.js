const UserModel = require('../models/User');
const CryptoJs = require('crypto-js');
const JWT = require('jsonwebtoken');


const UserAdd = async(req, res) => {

    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.ENC_KEY).toString(),
    });
    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (error) {

        res.status(500).json(error);

    }

}

// Login User
const LoginUser = async(req, res) => {

    try {
        const userlogin = await UserModel.findOne({
            username: req.body.username
        });
        !userlogin && res.status(401).json("Wrong credentials!!");
        var bytes = CryptoJs.AES.decrypt(userlogin.password, process.env.ENC_KEY);
        var Originalpassword = bytes.toString(CryptoJs.enc.Utf8);
        Originalpassword !== req.body.password && res.status(401).json("Wrong credentials!!");

        const accessToken = JWT.sign({
                id: userlogin._id,
                isAdmin: userlogin.isAdmin
            },
            process.env.JWT_SEC, { expiresIn: '3d' }
        );
        const { password, ...others } = userlogin._doc;

        res.status(200).json({...others, accessToken });
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports = { UserAdd, LoginUser };