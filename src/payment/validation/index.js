'use strict';
const Joi = require('joi');

module.exports = {
    createPayment: {
        body: {
            enterpriseId: Joi.string().required().max(100),
            type: Joi.string().required(),
            term: Joi.number().required(),
            price: Joi.number().required()
        }
    }
}
