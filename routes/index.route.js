'use strict';
const express = require('express');
const router = express.Router();

const enterprisesRoutes = require('./enterprises.route');

router.use('/enterprises',enterprisesRoutes);

router.get("/",(req,res,next)=>{
    res.status(200).json({data:"All is ok"});
});

module.exports = router;
