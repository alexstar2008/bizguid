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

    //INSERT
    const insertCategories = (data) => {
        const collection = db.get().collection('categories');

        return new Promise((resolve, reject) => {
            const categories = data;
            if (categories.length > 0) {
                collection.deleteMany({});
                collection.insertMany(categories, (err) => {
                    if (err)
                        reject("Insertion error(empty):[Categories]");
                    resolve("Transferred:[Categories]");
                });
            } else
                reject("Insertion error(empty):[Categories]");
        });
    };

    return {
        getChildCategories,
        insertCategories
    };
};

module.exports = categoriesController;