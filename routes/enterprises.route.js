'use strict';
const express = require('express');
const router = express.Router();

const enterprisesController = require('../controllers/enterprises.controller')();

//All
router.get('/', (req, res, next) => {
	const {offset, amount} = req.query;
	enterprisesController.getAllCompanies(offset, amount).then((data) => {
		res.status(200).send(data);
	}).catch(next);
});
//Slug
router.get('/:slug', (req, res, next) => {
	const slug = req.params.slug;
	enterprisesController.getCompanyInfo(slug).then((data) => {
		res.status(200).send(data);
	}).catch(next);
});
//Category&Region
router.get('/search', (req, res, next) => {
	const {categoryIds, regionIds, offset, amount} = req.query;
	enterprisesController.getCompaniesByCategoryAndRegion(categoryIds, regionIds, offset, amount).then((data) => {
		res.status(200).send(data);
	}).catch(next);
});
//Text
router.get('/text-search/:text', (req, res, next) => {
	const textSearch = req.params.text;
	enterprisesController.getCompaniesByTextSearch(textSearch).then((data) => {
		res.status((200)).send(data);
	}).catch(next);
});

//TEST: section for search indexes
router.get('/verify-text-indexes', (req, res, next) => {
	enterprisesController.verifyIndexes().then((data) => {
		res.status(200).send(data);
	}).catch(next);
});
//Region
router.get('/region/:id', (req, res, next) => {
	const id = req.params.id;
	enterprisesController.getCompaniesByRegion(id).then((data) => {
		res.status(200).send(data);
	}).catch(next);
});

module.exports = router;