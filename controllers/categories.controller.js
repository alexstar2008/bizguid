const db = require('../config/db');

const categoriesController = function () {

    // const getChildRegions = (slug="ukraine")=>{
    //     const collection = db.get().collection('regions');
    //     return new Promise((resolve, reject) => {
    //         collection.find({"ancestors.slug":slug}, (err, regions) => {
    //             if (err)
    //                 reject(new Error("Error of getting data" + err));
    //             resolve(regions.toArray());
    //         });
    //     });
    // };
    const insertCategories = (data) =>{
        const collection = db.get().collection('categories');
        const categories = data;

        // collection.createIndex( { ancestors: 1 } );

        return new Promise((resolve, reject) => {
            if(categories.length>0){
                collection.deleteMany({});
                collection.insertMany(categories, (err, res) => {
                    if (err)
                        reject(new Error(err));
                    resolve(res);
                });
            }else
                reject(new Error("Cannot insert categories"));
        });
    };
    return{
        // getChildRegions,
        insertCategories
    };
};

module.exports = categoriesController;