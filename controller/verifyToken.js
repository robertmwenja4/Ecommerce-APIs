const JWT = require('jsonwebtoken');

//Is a middleware hence next
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Invalid Token");
            req.user = user;
            next();
        })

    } else {
        res.status(401).json("Unauthenticated User");
    }
}

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Access Denied");
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Access Denied");
        }
    })
}
module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };