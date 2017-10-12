'use strict';

const app = require('../config/express');
const {port} = require('../config/config').serverSettings;
const transferService = require('../transfer/transfer.js')();


const start = () => {
    return new Promise((resolve, reject) => {
        if (!port) {
            reject(new Error("Port should be specified"));
        }

        // transfer regions
        // transferService.transferRegions();
        // transferService.transferCategories();
        // transferService.transferEnterprises();

        const server = app.listen(port, () => {
            resolve(server);
        });
    });
};
module.exports = {start};





