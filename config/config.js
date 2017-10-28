'use strict';

const dbSettings = {
	mongoDb: {
		db: process.env.MONGO_DB || 'bizguid',
		username: process.env.MONGO_DB_USERNAME || 'admin',
		pass: process.env.MONGO_DB_PASS || '4232',
		host: process.env.MONGO_DB_HOST || 'ds143532.mlab.com',
		port: process.env.MONGO_PORT || 43532
	},
	sqlDb: {
		db: process.env.SQL_DB || 'new_biz_guid',
		username: process.env.SQL_DB_USERNAME || 'root',
		pass: process.env.SQL_DB_PASS || '970619',
		host: process.env.SQL_DB_HOST || '127.0.0.1',
		port: process.env.SQL_PORT || 3306
	}
};
const serverSettings = {
	port: process.env.PORT || 3001
};

module.exports = {dbSettings, serverSettings};
