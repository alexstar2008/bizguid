const options = require("./config/config.js");
const mongoConnection =  require("./repository/mongoDbConnection");
const repository = require("./repository/repository.js");
// const sqlConnection = require("./repository/")
const server = require("./server/server.js");

let repo = null;

mongoConnection.makeConnection(options.dbSettings.mongoDb).then((db)=>{
    repository.connect(db).then((connection)=>{
        repo = connection;
        server.start({port:options.serverSettings.port,repo,sqlDbOptions:options.dbSettings.sqlDb}).then((app)=>{
            console.log("Server started");
        });
    });
});