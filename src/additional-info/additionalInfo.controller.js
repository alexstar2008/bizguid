'use strict';

const db = require('../libs/db');

async function getAdditionalInfoList(req, res) {
    const collection = db.get().collection('additionalInfo');

    const aditionalInfo = await collection.find({}).toArray();
    res.json({
        success: true,
        aditionalInfo
    });
}
async function addAdditionalInfoRequest(req, res) {
    const { name, phone, email, message, enterprise } = req.body;
    const collection = db.get().collection('additionalInfo');
    const { insertedId: additionalInfoId } = await collection.insertOne({ name, phone, email, message, enterprise });
    res.json({
        success: true,
        additionalInfoId
    });
}

const AdditionalInfo = {
    getAdditionalInfoList,
    addAdditionalInfoRequest
};

module.exports = AdditionalInfo;