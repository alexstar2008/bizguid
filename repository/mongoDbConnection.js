const MongoClient = require('mongodb').MongoClient;

const makeConnection = (options) => {
    return new Promise((resolve, reject) => {
        const url = `mongodb://${options.username}:${options.pass}@${options.host}:${options.port}/${options.db}`;
        console.log(url);
        MongoClient.connect(url, (err, db) => {
            if (err)
                reject(new Error("Error of db" + err));
            console.log("Success");
            resolve(db);
        });
    });
};

module.exports = Object.assign({}, {makeConnection});
