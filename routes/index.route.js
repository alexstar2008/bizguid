'use strict';
const express = require('express');
const router = express.Router();

const enterprisesRoutes = require('./enterprises.route');
const regionsRoutes = require('./regions.route');
const categoriesRoutes = require('./categories.route');

router.use('/enterprises', enterprisesRoutes);
router.use('/regions', regionsRoutes);
router.use('/categories', categoriesRoutes);

router.get("/", (req, res, next) => {
    res.status(200).json({data: "All is ok"});
});

module.exports = router;
