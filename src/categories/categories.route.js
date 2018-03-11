'use strict';
const router = require('express').Router();

const categoriesController = require('./categories.controller');

router.get('/:id?', (req, res, next) => {
	const id = req.params.id;
	categoriesController.getChildCategories(id).then((data) => {
		res.status(200).send(data);
	}).catch(next);
});

module.exports = router;

