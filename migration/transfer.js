const mysqlConnection = require('./mysqlDbConnection');


const transfer = ()=>{
    const makeTransfer = (mongoDbSettings,repo)=>{
        const conn = mysqlConnection.makeConnection(mongoDbSettings);
        console.log("Vzhuh transfered");
    };
    return {
      makeTransfer
    };
};

module.exports =  transfer;