'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('../routes/index.route');
const {port} = require('../config/config').serverSettings;
//transfer
const transferService = require('../migration/transfer.js')();


const start = ()=>{
    return new Promise((resolve,reject)=>{
        if(!port){
            reject(new Error("Port should be specified"));
        }

        const app = express();

        app.use(morgan('combined'));
        app.use(helmet());

        app.use('/api',routes);

         //transfer regions
         // transferService.transferRegions();


        const server = app.listen(port,()=>{resolve(server);});
    });
};
module.exports = {start};





