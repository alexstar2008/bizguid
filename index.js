const db = require("./config/db");
const server = require("./server/server.js");

db.connect().then(() => {
    server.start().then(() => {
        console.log("Server started");
    });
});