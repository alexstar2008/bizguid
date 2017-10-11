const db = require('../config/db');

const categoriesController = function () {

    const getChildCategories = (id) => {
        const collection = db.get().collection('categories');
        let query = {};
        if (!id) {
            query = {'parent_id': null};
        } else {
            query = {'parent_id': id};
        }

        return new Promise((resolve, reject) => {
            collection.find(query, {_id: 1, slug: 1, name: 1}, (err, categories) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(categories.toArray());
            });
        });
    };

    const insertCategories = (data) => {
        const collection = db.get().collection('categories');
        const categories = data;

        // collection.createIndex( { ancestors: 1 } );

        return new Promise((resolve, reject) => {
            if (categories.length > 0) {
                collection.deleteMany({});
                collection.insertMany(categories, (err, res) => {
                    if (err)
                        reject(new Error(err));
                    resolve(res);
                });
            } else
                reject(new Error("Cannot insert categories"));
        });
    };
    return {
        getChildCategories,
        insertCategories
    };
};

module.exports = categoriesController;