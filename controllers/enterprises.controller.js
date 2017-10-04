const db = require('../config/db');

const companyController = function () {

    //GET
    const getAllCompanies = (skip = 0, limit = 100) => {
        const collection = db.get().collection('companiesShort');

        return new Promise((resolve, reject) => {
            const options = {
                skip:+skip,
                limit:+limit
            };
            collection.find({}, options, (err, companies) => {
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
                {
                    '_id': 1,
                    'slug': 1,
                    'name': 1,
                    'logo': 1,
                    'emails': 1,
                    'products': 1,
                    'description': 1,
                    'details': 1,
                    'bankDetails': 1
                }, (err, company) => {
                    if (err)
                        reject(new Error("Error of getting data" + err));
                    resolve(company);
                });
        });
    };

    const getCompaniesByRegion = (id=724) =>{
        const collection = db.get().collection('companiesShort');
        return new Promise((resolve,reject)=>{
            collection.find({'companyRegionsId':id},(err,companies)=>{
                if(err)
                    reject(new Error("Error of getting data"+err));
                resolve(companies.toArray());
            });
        });
    };

    const insertFullCompanies = (data) => {
        const collection = db.get().collection('companiesFull');
        return new Promise((resolve, reject) => {
            const companies = data;
            collection.remove();
            collection.insertMany(companies, (err, res) => {
                if (err)
                    reject(new Error("Cannot insert"));
                resolve(res);
            });
        });
    };
    const insertShortCompanies = (data) => {
        const collection = db.get().collection('companiesShort');
        return new Promise((resolve, reject) => {
            const companies = data;
            collection.remove();
            collection.insertMany(companies, (err, res) => {
                if (err)
                    reject(new Error("Cannot insert"));
                resolve(res);
            });
        });
    };
    const insertRegions = (data) =>{
        const collection = db.get().collection('regions');
        collection.createIndex( { ancestors: 1 } );
        return new Promise((resolve, reject) => {
            const regions = data;
            collection.remove();
            collection.insertMany(regions, (err, res) => {
                if (err)
                    reject(new Error("Cannot insert regions"));
                resolve(res);
            });
        });
    };

    return {
        getAllCompanies,
        getCompanyInfo,
        insertFullCompanies,
        insertShortCompanies,
        insertRegions,
        getCompaniesByRegion
    };
};

module.exports = companyController;
