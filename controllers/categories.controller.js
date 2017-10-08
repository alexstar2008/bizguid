const db = require('../config/db');

const categoriesController = function () {

    const getChildCategories = (slug="ukraine")=>{
        console.log(slug);
        const collection = db.get().collection('categories');
        return new Promise((resolve, reject) => {
            collection.find({"ancestors.slug":slug}, (err, categories) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(categories.toArray());
            });
        });
    };

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
        getChildCategories,
        insertCategories
    };
};

module.exports = categoriesController;