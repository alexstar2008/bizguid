'use strict';
const express = require('express');
const HTTPStatus = require('http-status');
const router = express.Router();

const enterprisesRoutes = require('./enterprises.route');
const regionsRoutes = require('./regions.route');
const categoriesRoutes = require('./categories.route');
const paymentRoutes = require('../payment/payment.route');

router.get('/', (req, res) => {
	res.status(HTTPStatus.OK).json({ data: 'Welcome to BizGuid API' });
});

router.use('/enterprises', enterprisesRoutes);
router.use('/regions', regionsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;