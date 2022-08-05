const request = require('request');
const bod = require('body-parser');

const mpesaPayment = (req, res, next) => {
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    let auth = Buffer.from(process.env.CONS_KEY).toString("base64");
    console.log(auth);

    request({
            url: url,
            headers: {
                "Authorization": "Basic " + auth,
            },
        },
        (err, body) => {
            if (err) {
                console.log(err);
            } else {
                /* res.status(200).json(body.body);
                console.log(JSON.parse(body.body)) */
                req.access_token = JSON.parse(body.body).access_token;
                next();
            }
        }
    );
}

const access = (req, res) => {
    mpesaPayment(req, res, () => {
        res.status(200).json({ access_token: req.access_token });
    })
}

const stkPush = (req, res) => {
    mpesaPayment(req, res, () => {
        let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        let auth = "Bearer " + req.access_token;
        let shortCode = process.env.SHORT_CODE;
        var today = new Date();
        var DD = String(today.getDate()).padStart(2, '0');
        var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var YYYY = today.getFullYear();
        var hh = today.getHours();
        var mm = today.getMinutes();
        var ss = today.getSeconds();
        today = YYYY + MM + DD + hh + mm + ss;
        console.log(today);
        let password = Buffer.from(shortCode + process.env.PASS_KEY + today).toString("base64");

        request({

                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth,
                },
                json: {
                    "BusinessShortCode": shortCode,
                    "Password": password,
                    "Timestamp": today,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": req.body.Amount,
                    "PartyA": req.body.PhoneNumber,
                    "PartyB": shortCode,
                    "PhoneNumber": req.body.PhoneNumber,
                    "CallBackURL": "http://localhost:5000/api/mpesa/callback",
                    "AccountReference": "SHOPIFY LIMITED",
                    "TransactionDesc": "Payment of Items"
                }
            },
            (err, body) => {
                if (err) {
                    console.log(err);
                } else {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.status(200).json(body);
                }
            }
        );
    })

}

const mpeseCallback = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("---------RESPONSE-----------");
    let response = await req.body;
    console.log(response);

}

module.exports = { mpesaPayment, access, stkPush, mpeseCallback };