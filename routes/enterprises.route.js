'use strict';

const express = require('express');
const router = express.Router();

const enterprisesController = require('../controllers/enterprises.controller')();

router.get("/", (req, res, next) => {
    const offset = req.query.offset;
    const amount = req.query.amount;
    enterprisesController.getAllCompanies(offset, amount).then((data) => {
        res.status(200).send(data);
    });
});

router.get("/search", (req, res, next) => {
    const {categoryIds, regionIds, offset, amount} = req.query;
    enterprisesController.getCompaniesByCategoryAndRegion(categoryIds, regionIds, offset, amount).then((data) => {
        res.status(200).send(data);
    });
});
//TEST: section for search indexes
router.get("/verify-text-indexes",(req,res,next)=>{
    enterprisesController.verifyIndexes().then((data)=>{
      res.status(200).send(data);
    });
});
router.get("/text-search/:text",(req,res,next)=>{
    const textSearch = req.params.text;
    enterprisesController.getCompaniesByTextSearch(textSearch).then((data)=>{
        res.status((200)).send(data);
    });
});

router.get("/:slug", (req, res, next) => {
    const slug = req.params.slug;
    enterprisesController.getCompanyInfo(slug).then((data) => {
        res.status(200).send(data);
    });
});

router.get("/region/:id", (req, res, next) => {
    const id = req.params.id;
    enterprisesController.getCompaniesByRegion(id).then((data) => {
        res.status(200).send(data);
    });
});


module.exports = router;