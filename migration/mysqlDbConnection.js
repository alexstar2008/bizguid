const mysql = require('mysql');


const makeConnection = (options)=>{
    // return new Promise((resolve,reject)=>{
        const connection = mysql.createConnection({
            host:options.host,
            user: options.username,
            password: options.pass,
            database:options.db
        });
        connection.connect();
        return connection;
    // });
};


module.exports = {makeConnection};