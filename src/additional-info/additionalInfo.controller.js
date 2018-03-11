'use strict';

const { ObjectId } = require('mongodb');
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
async function removeAdditionalInfoRequest(req, res) {
    const { additionalInfoId } = req.params;
    const collection = db.get().collection('additionalInfo');
    await collection.deleteOne({ _id: new ObjectId(additionalInfoId) });

    res.json({
        success: true,
        additionalInfoId
    });
}
const AdditionalInfo = {
    getAdditionalInfoList,
    addAdditionalInfoRequest,
    removeAdditionalInfoRequest
};

module.exports = AdditionalInfo;