'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const enterprisesApi = require('../api/enterprises');

//transfer
const transfer = require('../migration/transfer.js');


const start = (options)=>{
    return new Promise((resolve,reject)=>{
        if(!options.port){
            reject(new Error("Port should be specified"));
        }

        const app = express();

        app.use(morgan('combined'));
        app.use(helmet());

        enterprisesApi(app,options.repo);

        const transferService = transfer();
        // transferService.makeTransfer(options.sqlDbOptions,options.repo);


        const server = app.listen(options.port,()=>{resolve(server);});
    });
};
module.exports = Object.assign({},{start});





