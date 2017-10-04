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

    return{
        getChildRegions
    };
};
module.exports = regionsController;