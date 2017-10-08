const db = require('../config/db');

const regionsController = function () {

    const getChildRegions = (slug="ukraine")=>{
        const collection = db.get().collection('regions');
        return new Promise((resolve, reject) => {
            collection.find({"ancestors.slug":slug}, (err, regions) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(regions.toArray());
            });
        });
    };
    const insertRegions = (data) =>{
        const collection = db.get().collection('regions');
        const regions = data;

        collection.createIndex( { ancestors: 1 } );

        return new Promise((resolve, reject) => {
            if(regions.length>0){
                collection.deleteMany({});
                collection.insertMany(regions, (err, res) => {
                    if (err)
                        reject(new Error(err));
                    resolve(res);
                });
            }else
                reject(new Error("Cannot insert regions"));
        });
    };
    return{
        getChildRegions,
        insertRegions
    };
};

module.exports = regionsController;