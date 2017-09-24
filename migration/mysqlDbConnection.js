const mysql = require('mysql');


const makeConnection = (options)=>{
    return new Promise((resolve,reject)=>{
        const connection = mysql.createConnection({
            host:options.host,
            user: options.user,
            pass: options.pass,
            database:options.db
        });
        // connection.connect();
        return connection;
    });
};


module.exports = Object.assign({},{makeConnection});