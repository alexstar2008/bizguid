'use strict';

const db = require('../libs/db');

const ApiError = require('../../helpers/ApiError');


function getChildRegions(id) {
	const collection = db.get().collection('regions');
	let query = {};
	if (!id) {
		query = { 'slug': 'ukraine' };
	} else {
		query = { 'parent_id': id };
	}
	return new Promise((resolve, reject) => {
		collection.find(query, { _id: 1, slug: 1, name: 1 }, (err, regions) => {
			if (err)
				reject(new ApiError(`Error of getting data${err}`));
			resolve(regions.toArray());
		});
	});
}

function insertRegions(data) {
	const collection = db.get().collection('regions');

	return new Promise((resolve, reject) => {
		const regions = data;
		if (regions.length > 0) {
			collection.deleteMany({});
			collection.insertMany(regions, (err) => {
				if (err)
					reject('Insertion error:[Regions]');
				resolve('Transferred:[Regions]');
			});
		} else
			reject('Insertion error(empty):[Regions]');
	});
}


const RegionsController = {
	getChildRegions,
	insertRegions
};

module.exports = RegionsController;