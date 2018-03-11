'use strict';

const db = require('../libs/db');
const ApiError = require('../../helpers/ApiError');


function getChildCategories(id) {
	const collection = db.get().collection('categories');
	let query = {};
	if (!id) {
		query = { 'parent_id': null };
	} else {
		query = { 'parent_id': id };
	}

	return new Promise((resolve, reject) => {
		collection.find(query, { _id: 1, slug: 1, name: 1 }, (err, categories) => {
			if (err)
				reject(new ApiError(`Error of getting data(${err})`));
			resolve(categories.toArray());
		});
	});
}
//Insert parsed
function insertCategories(data) {
	const collection = db.get().collection('categories');

	return new Promise((resolve, reject) => {
		const categories = data;
		if (categories.length > 0) {
			collection.deleteMany({});
			collection.insertMany(categories, (err) => {
				if (err)
					reject('Insertion error(empty):[Categories]');
				resolve('Transferred:[Categories]');
			});
		} else
			reject('Insertion error(empty):[Categories]');
	});
}


const CategoriesController = {
	getChildCategories,
	insertCategories
};

module.exports = CategoriesController;