'use strict';

const {MongoClient} = require('mongodb');
const {username, pass, host, port, db} = require('./config').dbSettings.mongoDb;

const connection = {
    db: null
};
const connect = function () {
    return new Promise((resolve, reject) => {
        const url = `mongodb://${username}:${pass}@${host}:${port}/${db}`;
        MongoClient.connect(url, (err, db) => {
            if (err)
                reject(new Error("Error of db" + err));
            connection.db = db;
            console.log("Connected");
            resolve(db);
        });
    });
};
const get = function () {
    console.log("Got connection");
    return connection.db;
};
const disconnect = function () {
    if (connection.db)
        connection.db.disconnect();
};

module.exports = {connect, get, disconnect};