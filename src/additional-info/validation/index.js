'use strict';

const Joi = require('joi');
//

module.exports = {
    addAdditionalInfoRequest: {
        body: {
            name: Joi.string().max(200).required(),
            phone: Joi.string().max(200),
            email: Joi.string().email().required(),
            message: Joi.string().max(1000).required(),
            enterprise: Joi.string().max(200).required()
        }
    }
};