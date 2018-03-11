'use strict';

const HTTPStatus = require('http-status');
//
const Liqpay = require('../libs/liqpay');


function createPayment(req, res) {
    res.status(HTTPStatus.OK).json(req.body);
}

function makeLiqpayRequest(req, res) {
    const liqpay = new Liqpay('i64096763190', 'tyzxHB8Fuvx1jdCvahTQh51AdcqQ4e9tpNqpjfUg');
    // const form = liqpay.cnb_form({ version: 1, amount: 10, currency: 'UAH', description: 'Test ' });
   liqpay.api('3/checkout', { version: 3, amount: 10, currency: 'UAH', description: 'Test', action: 'pay', order_id: 1, sandbox: 1 }, (body) => {
        console.log(body);
        res.send(body);
    }, (err, resp) => {
        res.send(resp);
        // console.log(resp);
    });
}
function getLiqpayCallback() {

}

const PaymentController = {
    createPayment,
    makeLiqpayRequest,
    getLiqpayCallback
};

module.exports = PaymentController;