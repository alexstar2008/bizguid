const router = require('express').Router();
const categoriesController = require('../controllers/categories.controller')();

router.get('/:id?',(req,res)=>{
    const id = req.params.id;
    categoriesController.getChildCategories(id).then((data)=>{
       res.status(200).send(data);
    });
});


module.exports = router;

