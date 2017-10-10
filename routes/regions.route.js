'use strict';
const router = require('express').Router();
const regionsController = require('../controllers/regions.controller')();

router.get('/:id?',(req,res)=>{
    const id = req.params.id;
    regionsController.getChildRegions(id).then((data)=>{
        res.status(200).send(data);
    });
});

module.exports = router;