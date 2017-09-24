const dbSettings = {
    mongoDb: {
        db: process.env.MONGO_DB || 'bizguid',
        username: process.env.MONGO_DB_USERNAME || 'admin',
        pass: process.env.MONGO_DB_PASS || '4232',
        host: process.env.MONGO_DB_HOST || 'ds143532.mlab.com',
        port: process.env.MONGO_PORT || 43532
    },
    sqlDb: {
        db: process.env.SQL_DB || 'test',
        username: process.env.SQL_DB_USERNAME || 'alex',
        pass: process.env.SQL_DB_PASS || 'pass',
        host: process.env.SQL_DB_HOST || 'host',
        port: process.env.SQL_PORT || 3000
    }
};
const serverSettings = {
    port: process.env.PORT || 3000
};

module.exports = Object.assign({}, {dbSettings, serverSettings});
