'use strict';

const categorySchema = require('./category-schema');
const regionSchema = require('./region-schema');
const enterpriseSchema = require('./enterpise-schema');

console.log(categorySchema);
const schema = {
    enterpriseSchema,
    categorySchema,
    regionSchema
};
module.exports = schema;