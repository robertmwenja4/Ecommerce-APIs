const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const cartRoute = require('./routes/cartRoute');
const mpesaRoute = require('./routes/mpesaRoute');
dotenv.config();

const dbUrl = process.env.MONGO_URL;
mongoose.connect(dbUrl).then(() => console.log('DB Connection is Successful'))
    .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
    console.log('Backend is runing!!');
});

app.use(express.json());
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/mpesa', mpesaRoute);