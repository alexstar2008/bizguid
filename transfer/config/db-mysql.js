const options = require('../../config/config').dbSettings.sqlDb;
const mysql = require('mysql');

const state = {
	pool: null
};

//TODO:connect error handling
const connect = function () {
	if (state.pool)
		return;
	state.pool = mysql.createPool({
		host: options.host,
		user: options.username,
		password: options.pass,
		database: options.db
	});
};
const get = function () {
	return new Promise((resolve, reject) => {
		state.pool.getConnection((err, conn) => {
			if (err)
				reject('[MySQL]:ERROR connection-' + err);
			resolve(conn);
		});
	});
};
const disconnect = function () {
	state.pool.end((err) => {
		console.log('[MongoDb]:ERROR disconnection-' + err);
	});
};

module.exports = {connect, get, disconnect};