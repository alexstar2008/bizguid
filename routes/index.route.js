'use strict';
const express = require('express');
const router = express.Router();

const enterprisesRoutes = require('./enterprises.route');
const regionsRoutes = require('./regions.route');

router.use('/enterprises',enterprisesRoutes);
router.use('/regions',regionsRoutes);

router.get("/",(req,res,next)=>{
    res.status(200).json({data:"All is ok"});
});

module.exports = router;
