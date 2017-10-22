const db = require('../config/db');

const regionsController = function () {

    const getChildRegions = (id) => {
        const collection = db.get().collection('regions');
        let query = {};
        if (!id) {
            query = {'slug': 'ukraine'}
        } else {
            query = {'parent_id': id}
        }
        return new Promise((resolve, reject) => {
            collection.find(query, {_id: 1, slug: 1, name: 1}, (err, regions) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(regions.toArray());
            });
        });
    };

    //INSERT
    const insertRegions = (data) => {
        const collection = db.get().collection('regions');

        return new Promise((resolve, reject) => {
            const regions = data;
            if (regions.length > 0) {
                collection.deleteMany({});
                collection.insertMany(regions, (err) => {
                    if (err)
                        reject("Insertion error:[Regions]");
                    resolve("Transferred:[Regions]");
                });
            } else
                reject("Insertion error(empty):[Regions]");
        });
    };

    return {
        getChildRegions,
        insertRegions
    };
};

module.exports = regionsController;