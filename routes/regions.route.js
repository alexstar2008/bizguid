const router = require('express').Router();
const regionsController = require('../controllers/regions.controller')();

router.get('/:slug',(req,res)=>{
    const slug = req.params.slug;
    regionsController.getChildRegions(slug).then((data)=>{
        res.status(200).send(data);
    });
});

module.exports = router;