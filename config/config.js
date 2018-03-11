'use strict';

const dbSettings = {
	mongoDb: {
		db: process.env.MONGO_DB || 'bizguid',
		username: process.env.MONGO_DB_USERNAME || 'admin',
		pass: process.env.MONGO_DB_PASS || '4232',
		host: process.env.MONGO_DB_HOST || 'ds143532.mlab.com',
		port: process.env.MONGO_PORT || '43532'
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
	port: process.env.PORT || 3000
};

module.exports = {dbSettings, serverSettings};
