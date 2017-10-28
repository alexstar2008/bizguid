'use strict';

const categorySchema = require('./category-schema');
const regionSchema = require('./region-schema');
const enterpriseSchema = require('./enterpise-schema');

const schema = {
	enterpriseSchema,
	categorySchema,
	regionSchema
};
module.exports = schema;