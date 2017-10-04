'use strict';

const express = require('express');
const router = express.Router();

const enterprisesController = require('../controllers/enterprises.controller')();

router.get("/",(req,res,next)=>{
    const offset = req.query.offset;
    const amount  = req.query.amount;
    console.log('route');
    enterprisesController.getAllCompanies(offset,amount).then((data)=>{
        res.status(200).send(data);
    });
});

router.get("/:slug",(req,res,next)=>{
    const slug = req.params.slug;
    enterprisesController.getCompanyInfo(slug).then((data)=>{
        res.status(200).send(data);
    });
});




module.exports = router;