'use strict';

const express = require('express');
const validate = require('express-validation');
const router = express.Router();
//
const paymentValidator = require('./validation');
const paymentController = require('./payment.controller');

router.post('/', validate(paymentValidator.createPayment), paymentController.createPayment);
router.get('/liqpay', paymentController.makeLiqpayRequest);
router.post('/liqpay/callback', paymentController.getLiqpayCallback);


module.exports = router;