'use strict';

const {MongoClient} = require('mongodb');
const {username, pass, host, port, db} = require('../../config').dbSettings.mongoDb;

const connection = {
	db: null
};

const connect = function () {
	return new Promise((resolve, reject) => {
		const url = `mongodb://${username}:${pass}@${host}:${port}/${db}`;
		MongoClient.connect(url, (err, db) => {
			if (err)
				reject('[MongoDB]:ERROR connection');
			connection.db = db;
			resolve('[MongoDB]:connected');
		});
	});
};
const disconnect = function () {
	if (connection.db) {
		console.log('[MongoDb]:disconnected');
		connection.db.disconnect();
	}
};
const get = function () {
	console.log('[MongoDb]:got connection');
	return connection.db;
};

module.exports = {connect, get, disconnect};