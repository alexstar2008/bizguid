'use strict';

const dbSettings = {
	mongoDb: {
		db: process.env.MONGO_DB
		username: process.env.MONGO_DB_USERNAME,
		pass: process.env.MONGO_DB_PASS,
		host: process.env.MONGO_DB_HOST,
		port: process.env.MONGO_PORT
	},
	sqlDb: {
		db: process.env.SQL_DB,
		username: process.env.SQL_DB_USERNAME,
		pass: process.env.SQL_DB_PASS,
		host: process.env.SQL_DB_HOST,
		port: process.env.SQL_PORT
	}
};
const serverSettings = {
	port: process.env.PORT
};

module.exports = {dbSettings, serverSettings};
