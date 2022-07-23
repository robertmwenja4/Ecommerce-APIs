const router = require('express').Router();
const authControl = require('../controller/authController');

router.post('/register', authControl.UserAdd);
router.post('/login', authControl.LoginUser);


module.exports = router;