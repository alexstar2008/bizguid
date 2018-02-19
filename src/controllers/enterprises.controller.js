'use strict';
const db = require('../libs/db');

const ApiError = require('../../helpers/ApiError');

const companyController = function () {
	//Get
	const getAllCompanies = (skip = 0, limit = 100) => {
		const collection = db.get().collection('companiesShort');

		return new Promise((resolve, reject) => {
			const options = {
				skip: +skip,
				limit: +limit
			};
			collection.count({}, (err, totalAmountEnterprises) => {
				if (err)
					return reject(new ApiError(`Error of getting data(${err})`));
				collection.find({}, {
					_id: 1,
					slug: 1,
					name: 1,
					emails: 1,
					phones: 1,
					regionName: 1
				}, options).toArray((err, enterprises) => {
					if (err)
						return reject(new ApiError(`Error of getting data(${err})`));
					resolve({enterprises, totalAmountEnterprises});
				});
			});

		});
	};
	const getCompanyInfo = (slug) => {
		const collection = db.get().collection('companiesFull');
		return new Promise((resolve, reject) => {
			collection.findOne(
				{'slug': slug},
				(err, company) => {
					if (err)
						return reject(new ApiError(`Error of getting data(${err})`));
					resolve(company);
				});
		});
	};
	const getCompaniesByCategoryAndRegion = (categoryIds = [], regionsIds = [], skip = 0, limit = 100) => {
		const options = {
			skip: +skip,
			limit: +limit
		};
		const collection = db.get().collection('companiesShort');
		const query = {};
		if (categoryIds.length !== 0) {
			query.categoriesId = {
				$in: categoryIds.split(',')
			};
		}
		if (regionsIds.length !== 0) {
			query.companyRegionsId = {
				$in: regionsIds.split(',')
			};
		}

		return new Promise((resolve, reject) => {
			collection.count(query, (err, totalAmountEnterprises) => {
				if (err)
					return reject(new ApiError(`Error of getting data(${err})`));
				collection.find(query, options).toArray((err, enterprises) => {
					if (err)
						return reject(new ApiError(`Error of getting data(${err})`));
					resolve({enterprises, totalAmountEnterprises});
				});
			});
		});
	};
	const getCompaniesByTextSearch = (textSearch = '', skip = 0, limit = 100) => {
		const projection = {
			score: {$meta: 'textScore'}
		};
		const options = {
			skip: +skip,
			limit: +limit
		};
		const collection = db.get().collection('companiesShort');
		return new Promise((resolve, reject) => {
			const query = {$text: {$search: textSearch}};
			collection.count(query, (err, totalAmountEnterprises) => {
				if (err) {
					return reject(new ApiError(`Error of getting data(${err})`));
				}
				collection.find(query, projection, options).sort({score: {$meta: 'textScore'}}).toArray((err, enterprises) => {
					if (err) {
						return reject(new ApiError(`Error of getting data(${err})`));
					}
					resolve({totalAmountEnterprises, enterprises});
				});
			});
		});
	};
	//Insert parsed
	const insertFullEnterprises = (data) => {
		const collection = db.get().collection('companiesFull');
		collection.createIndex({slug: 1});

		return new Promise((resolve, reject) => {
			const companies = data;
			if (companies.length > 0) {
				collection.deleteMany({});
				collection.insertMany(companies, (err) => {
					if (err)
						reject('Insertion error:[Full enterprises]');
					resolve('Transferred:[Full enterprises]');
				});
			} else
				reject('Insertion error(empty):[Full enterprises]');
		});
	};
	const insertShortEnterprises = (data) => {
		const collection = db.get().collection('companiesShort');
		collection.createIndex({categoriesId: 1});
		collection.createIndex({companyRegionsId: 1});

		return new Promise((resolve, reject) => {
			const companies = data;
			if (companies.length > 0) {
				collection.deleteMany({});
				collection.insertMany(companies, (err) => {
					if (err)
						reject('Insertion error:[Short enterprises]');
					resolve('Transferred:[Short enterprises]');
				});
			} else
				reject('Insertion error(empty):[Short enterprises]');
		});
	};
	//Test section
	const verifyIndexes = () => {
		return new Promise((resolve) => {
			const collection = db.get().collection('companiesShort');
			collection.createIndex(
				{'name': 'text', 'productsAndOffers': 'text'},
				{
					default_language: 'russian',
					'weights': {name: +3, productsAndOffers: 1}
				});
			resolve('done');
		});
	};
	const getCompaniesByRegion = (id = 724, skip = 0, limit = 100) => {
		const options = {
			skip: +skip,
			limit: +limit
		};
		const collection = db.get().collection('companiesShort');
		return new Promise((resolve, reject) => {
			collection.find({'companyRegionsId': id}, options, (err, companies) => {
				if (err)
					reject(new Error('Error of getting data' + err));
				resolve(companies.toArray());
			});
		});
	};
	const getCompaniesByCategory = (id = 724, skip = 0, limit = 100) => {
		const options = {
			skip: +skip,
			limit: +limit
		};
		const collection = db.get().collection('companiesShort');
		return new Promise((resolve, reject) => {
			collection.find({'categoriesId': id}, options, (err, enterprises) => {
				if (err)
					reject(new Error('Error of getting data' + err));
				resolve(enterprises.toArray());
			});
		});
	};

	// TODO: change getting additional info to main section
	const getAdditionalInfo = (regionIds = [],categoryIds = []) => {
		const regionCollection = db.get().collection('regions');
		const categoryCollection = db.get().collection('categories');

		const projection = {'_id':1,'name':1};
		return new Promise((resolve,reject)=>{
			regionCollection.find({'_id':{$in:regionIds}},projection).toArray((err,regions)=>{
				if(err)
					reject(new Error('Error of getting data' + err));
				categoryCollection.find({'_id':{$in:categoryIds}},projection).toArray((err,categories)=>{
					if(err)
						reject(new Error('Error of getting data' + err));
					resolve({regions,categories});
				});
			});
		});
	};

	return {
		getAllCompanies,
		getCompanyInfo,
		getCompaniesByCategoryAndRegion,
		getCompaniesByTextSearch,
		insertFullEnterprises,
		insertShortEnterprises,
		verifyIndexes,
		getCompaniesByRegion,
		getCompaniesByCategory,
		getAdditionalInfo
	};
};

module.exports = companyController;