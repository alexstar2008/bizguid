//repository.js


const connection = (db) => {

    const getAllCompanies = () => {
        const collection = db.collection('companiesShort');
        return new Promise((resolve, reject) => {
            collection.find({}, (err, companies) => {
                if (err)
                    reject(new Error("Error of getting data" + err));
                resolve(companies.toArray());
            });
        });
    };
    const getCompanyMainInfo = (slug) => {
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

    const disconnect = () => {
        db.close();
    };

    return {
        getAllCompanies,
        getCompanyMainInfo,
        disconnect,
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
