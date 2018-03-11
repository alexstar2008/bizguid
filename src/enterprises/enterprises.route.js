'use strict';
const express = require('express');
const router = express.Router();
const HTTP = require('http-status');
const bodyParser = require('body-parser');

const EnterprisesController = require('./enterprises.controller');


router.post('/uprise', EnterprisesController.upriseEnterprise);
router.get('/uprise', EnterprisesController.getUprisedEnterprises);
router.put('/uprise', EnterprisesController.updateUpriseEnterprise);
router.delete('/uprise', EnterprisesController.removeUpriseOfEnterprise);
//All
router.get('/', (req, res, next) => {
	const { offset, amount } = req.query;
	EnterprisesController.getAllCompanies(offset, amount).then((data) => {
		const { enterprises, totalAmountEnterprises } = data;
		res.header('X-total-count', totalAmountEnterprises).status(HTTP.OK).send(enterprises);
	}).catch(next);
});
//Category&Region
router.get('/search', (req, res, next) => {
	const { categoryIds, regionIds, offset, amount } = req.query;
	EnterprisesController.getCompaniesByCategoryAndRegion(categoryIds, regionIds, offset, amount).then((data) => {
		const { enterprises, totalAmountEnterprises } = data;
		res.header('X-total-count', totalAmountEnterprises).status(HTTP.OK).send(enterprises);
	}).catch(next);
});
//Slug
router.get('/:slug', (req, res, next) => {
	const slug = req.params.slug;
	EnterprisesController.getCompanyInfo(slug).then((data) => {
		res.status(HTTP.OK).send(data);
	}).catch(next);
});
//Text
router.get('/text-search/:text', (req, res, next) => {
	const textSearch = req.params.text;
	const { offset, amount } = req.query;
	EnterprisesController.getCompaniesByTextSearch(textSearch, offset, amount).then((data) => {
		const { enterprises, totalAmountEnterprises } = data;
		res.header('X-total-count', totalAmountEnterprises).status(HTTP.OK).send(enterprises);
	}).catch(next);
});

//TEST: section for search indexes
router.get('/verify-text-indexes', (req, res, next) => {
	EnterprisesController.verifyIndexes().then((data) => {
		res.status(HTTP.OK).send(data);
	}).catch(next);
});
//Region
router.get('/region/:id', (req, res, next) => {
	const id = req.params.id;
	EnterprisesController.getCompaniesByRegion(id).then((data) => {
		res.status(HTTP.OK).send(data);
	}).catch(next);
});

// TODO : fix shared search for enterprise
router.use(bodyParser.json());
router.post('/additional', (req, res, next) => {
	const { regions, categories } = req.body;
	EnterprisesController.getAdditionalInfo(regions, categories).then((data) => {
		res.status(HTTP.OK).send(data);
	}).catch(next);
});

module.exports = router;