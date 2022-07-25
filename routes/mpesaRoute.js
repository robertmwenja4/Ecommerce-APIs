const router = require('express').Router();
const mpesaRoute = require('../controller/mpesaController');

router.get('/accessToken', mpesaRoute.access);
router.get('/stk', mpesaRoute.stkPush);
router.post('/callback', mpesaRoute.mpeseCallback);

module.exports = router;