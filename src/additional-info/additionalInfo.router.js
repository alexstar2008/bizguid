'use strict';

const express = require('express');
const router = express.Router();
const validator = require('express-validation');
//
const AdditionalInfoController = require('./additionalInfo.controller');
const AdditionalInfoValidation = require('./validation');

router.post('/', validator(AdditionalInfoValidation.addAdditionalInfoRequest), AdditionalInfoController.addAdditionalInfoRequest);
router.get('/', AdditionalInfoController.getAdditionalInfoList);
router.put('/:additionalInfoId', AdditionalInfoController.updateAdditionalInfoRequest);
router.delete('/:additionalInfoId', AdditionalInfoController.removeAdditionalInfoRequest);


module.exports = router;