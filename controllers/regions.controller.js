const db = require('../config/db');

const regionsController = function () {

    const getChildRegions = (id)=>{
        const collection = db.get().collection('regions');
        let query = {};
        if(!id){
            query={'slug':'ukraine'}
        }else{
            query={'parent_id':id}
        }
        return new Promise((resolve, reject) => {
            collection.find(query,{ _id: 1, slug: 1, name:1 }, (err, regions) => {
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