'use strict';

const express = require('express');
const router = express.Router();
const validator = require('express-validation');
//
const AdditionalInfoController = require('./additionalInfo.controller');
const AdditionalInfoValidation = require('./validation');

router.get('/', AdditionalInfoController.getAdditionalInfoList);
router.post('/', validator(AdditionalInfoValidation.addAdditionalInfoRequest), AdditionalInfoController.addAdditionalInfoRequest);


module.exports = router;