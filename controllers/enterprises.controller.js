const db = require('../config/db');

const companyController = function () {

    //GET
    const getAllCompanies = (skip = 0, limit = 100) => {
        const collection = db.get().collection('companiesShort');

        return new Promise((resolve, reject) => {
            const options = {
                skip: +skip,
                limit: +limit
            };
            collection.find({}, {
                _id: 1,
                slug: 1,
                name: 1,
                emails: 1,
                phones: 1,
                regionName:1
            }, options, (err, companies) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(companies.toArray());
            });
        });
    };
    const getCompanyInfo = (slug) => {
        const collection = db.get().collection('companiesFull');
        return new Promise((resolve, reject) => {
            collection.findOne(
                {'slug': slug},
                // {
                //     '_id': 1,
                //     'slug': 1,
                //     'name': 1,
                //     'logo': 1,
                //     'emails': 1,
                //     'products': 1,
                //     'description': 1,
                //     'details': 1,
                //     'bankDetails': 1
                // },
                (err, company) => {
                    if (err)
                        reject(new Error("Error of getting data" + err));
                    resolve(company);
                });
        });
    };
    const getCompaniesByCategoryAndRegion = (categoryIds = [], regionsIds = [], skip = 0, limit = 100) => {
        const options = {
            skip: +skip,
            limit: +limit
        };
        const collection = db.get().collection('companiesShort');
        const query = {};
        console.log(query);
        if (categoryIds.length !== 0) {
            query.categoriesId = {
                $in: categoryIds.split(",")
            };
        }
        if (regionsIds.length !== 0) {
            query.companyRegionsId = {
                $in: regionsIds.split(",")
            }
        }

        return new Promise((resolve, reject) => {
            console.log(query);
            collection.find(query, options, (err, enterprises) => {
                if (err)
                    reject(`Error of getting data:${enterprises}`);
                resolve(enterprises.toArray());
            });
        });
    };

    //TEXT SEARCH
    const getCompaniesByTextSearch = (textSearch = "") => {
        const collection = db.get().collection('companiesShort');
        return new Promise((resolve, reject) => {
            collection.find({$text: {$search: textSearch}}, {score: {$meta: "textScore"}}, (err, data) => {
                if (err) {
                    reject("Error of getting data" + err);
                }
                resolve(data.sort({score: {$meta: "textScore"}}).toArray());
            });
        });
    };
    //TEST SECTION
    const verifyIndexes = () => {
        return new Promise((resolve, reject) => {
            const collection = db.get().collection('companiesShort');
            collection.createIndex(
                {"name": "text", "productsAndOffers": "text"},
                {
                    default_language: "russian",
                    "weights": {name:+ 3, productsAndOffers: 1}
                });
            resolve('done');
        });
    };
    const getCompaniesByRegion = (id = 724, skip = 0, limit = 100) => {
        const options = {
            skip: +skip,
            limit: +limit
        };
        const collection = db.get().collection('companiesShort');
        return new Promise((resolve, reject) => {
            collection.find({'companyRegionsId': id}, options, (err, companies) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(companies.toArray());
            });
        });
    };
    const getCompaniesByCategory = (id = 724, skip = 0, limit = 100) => {
        const options = {
            skip: +skip,
            limit: +limit
        };
        const collection = db.get().collection('companiesShort');
        return new Promise((resolve, reject) => {
            collection.find({'categoriesId': id}, options, (err, enterprises) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(enterprises.toArray());
            });
        });
    };

    //INSERT
    const insertFullEnterprises = (data) => {
        const collection = db.get().collection('companiesFull');
        collection.createIndex({slug: 1});

        return new Promise((resolve, reject) => {
            const companies = data;
            if (companies.length > 0) {
                collection.deleteMany({});
                collection.insertMany(companies, (err) => {
                    if (err)
                        reject("Insertion error:[Full enterprises]");
                    resolve("Transferred:[Full enterprises]");
                });
            } else
                reject("Insertion error(empty):[Full enterprises]");
        });
    };
    const insertShortEnterprises = (data) => {
        const collection = db.get().collection('companiesShort');
        collection.createIndex({categoriesId: 1});
        collection.createIndex({companyRegionsId: 1});

        return new Promise((resolve, reject) => {
            const companies = data;
            if (companies.length > 0) {
                collection.deleteMany({});
                collection.insertMany(companies, (err) => {
                    if (err)
                        reject("Insertion error:[Short enterprises]");
                    resolve("Transferred:[Short enterprises]");
                });
            } else
                reject("Insertion error(empty):[Short enterprises]");
        });
    };

    return {
        getCompaniesByTextSearch,
        getAllCompanies,
        getCompanyInfo,
        getCompaniesByRegion,
        getCompaniesByCategoryAndRegion,
        insertFullEnterprises,
        insertShortEnterprises,
        verifyIndexes
    };
};

module.exports = companyController;
