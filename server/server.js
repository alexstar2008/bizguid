'use strict';

const app = require('../config/express');
const {port} = require('../config/config').serverSettings;
const transferService = require('../transfer/transfer.js')();


const start = () => {
    return new Promise((resolve, reject) => {
        if (!port) {
            reject("[Server]:ERROR start");
        }

        // transfer regions
        // transferService.transferRegions();
        // transferService.transferCategories();
        // transferService.transferEnterprises();

        app.listen(port, (err) => {
            if(err)
                reject("[Server]:ERROR start");
            resolve(`[Server]:started at port ${port}`);
        });
    });
};
module.exports = {start};





