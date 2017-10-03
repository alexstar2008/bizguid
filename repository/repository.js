//repository.js


const connection = (db) => {

    const getAllCompanies = (skip=0,limit=100) => {
        const collection = db.collection('companiesShort');
        return new Promise((resolve, reject) => {
            const options = {
                skip,limit
            };
            collection.find({},options,(err, companies) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(companies.toArray());
            });
        });
    };
    const getCompanyInfo = (slug) => {
        const collection = db.collection('companiesFull');
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


    const insertFullCompanies = (data)=> {
        const collection = db.collection('companiesFull');
        return new Promise((resolve,reject)=>{
           const companies = data;
           collection.remove();
           collection.insertMany(companies,(err,res)=>{
                if(err)
                    reject(new Error("Cannot insert"));
                resolve(res);
           });
        });
    };
    const insertShortCompanies = (data)=> {
        const collection = db.collection('companiesShort');
        return new Promise((resolve,reject)=>{
            const companies = data;
            collection.remove();
            collection.insertMany(companies,(err,res)=>{
                if(err)
                    reject(new Error("Cannot insert"));
                resolve(res);
            });
        });
    };

    const disconnect = () => {
        db.close();
    };

    return {
        getAllCompanies,
        getCompanyInfo,
        disconnect,
        insertFullCompanies,
        insertShortCompanies
    };
};

const connect = (db) => {
    return new Promise((resolve, reject) => {
        if (!db)
            reject(new Error("Error of connection"));
        resolve(connection(db));
    });
};
module.exports = Object.assign({}, {connect});
