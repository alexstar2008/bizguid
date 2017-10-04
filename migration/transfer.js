const { ObjectID } = require('mongodb');

const config = require('../config/config').dbSettings;
const db = require('../config/db');
const mysqlConnection = require('./mysqlDbConnection');
const enterprisesController = require('../controllers/enterprises.controller')();



//helpers
const getFieldsBySchema = (schema, company) => {
    const filterCompany = {};

    for (schemaKey in schema) {
        const value = schema[schemaKey];

        if (typeof value === 'string') {
            if (company[value])
                filterCompany[schemaKey] = company[value];
        }
        else if (typeof value === 'function') {
            const result = value(company);
            if (result)
                filterCompany[schemaKey] = result;
        }
        else if (typeof  value === 'object') {
            const schemaKeyObject = schemaKey;
            const newFields = getFieldsBySchema(value, company);

            if (Object.keys(newFields).length != 0) {
                if (!filterCompany[schemaKeyObject])
                    filterCompany[schemaKeyObject] = {};
                Object.assign(filterCompany[schemaKeyObject], newFields);
            }
        }
    }
    return filterCompany;
};
const getFieldsBySchemaWithPredefined = (schema, company) => {
    const filterCompany = {};

    for (schemaKey in schema) {
        const value = schema[schemaKey];

        if (typeof value === 'string') {
            if (company[value])
                filterCompany[schemaKey] = company[value];
            else
                filterCompany[schemaKey] = value;
        }
        else if (typeof value === 'function') {
            const result = value(company);
            if (result)
                filterCompany[schemaKey] = result;
        }
        //TODO: CHANGE LOGIC
        else if (Array.isArray(value)) {
            filterCompany[schemaKey] = value;
        }
        else if (typeof  value === 'object') {
            const schemaKeyObject = schemaKey;
            const newFields = getFieldsBySchemaWithPredefined(value, company);

            if (Object.keys(newFields).length != 0) {
                if (!filterCompany[schemaKeyObject])
                    filterCompany[schemaKeyObject] = {};
                Object.assign(filterCompany[schemaKeyObject], newFields);
            }
        }
    }
    return filterCompany;
};

const transfer = () => {
    const transferCompanies = (mongoDbSettings, repo) => {
        let conn = mysqlConnection.makeConnection(mongoDbSettings);

        const amountOfCompanies = 10000;
        const sql = "SELECT *FROM enterprises JOIN enterprises_logo as logo ON " +
            "enterprises.id = logo.enterprises_id LIMIT " + conn.escape(amountOfCompanies);

        conn.query(sql, (err, results, fields) => {
            if (err)
                console.log(err);

            const len = results.length;
            const filteredFullCompanies = [];
            const filteredShortCompanies = [];

            const schemaFullCompany = {
                "slug": "subdomain",
                "name": "name_jur",
                "logo": "image",
                "description": "prod_dopol",
                "emails": (company) => {
                    let emails = null;
                    if (company.email)
                        emails = company.email.split(" , ");
                    // const emailContact = company.email_contact;
                    // if (emailContact && !emails.includes(emailContact))
                    //     emails.push(emailContact);
                    return emails;
                },
                "phones": (company) => {
                    let phone = '';
                    if (company.cod1 && company.t1)
                        phone = "+38 (" + company.cod1 + ") " + company.t1;
                    return phone;
                },
                "postAddress": (company) => {
                    let phone = '';
                    if (company.p_index_jur && company.address_jur_russian)
                        phone = company.p_index_jur + " " + company.address_jur_russian;
                    return phone;
                },
                "address": (company) => {
                    let address = '';
                    if (company.p_index_actual && company.address_actual)
                        address = company.p_index_actual + " " + company.address_actual_russian;
                    return address;
                },

                "faxes": (company) => {
                    let fax = '';
                    if (company.cod3 && company.t3_fax)
                        fax = "+38 (" + company.cod3 + ") " + company.t3_fax;
                    return fax;
                },
                "contactPeople": {
                    "manager": "contact",
                    "director": "fio_ruk_russian",
                    "accountant": "fio_buch"
                },
                "openHours": {
                    "Mon-Fri": (company) => {
                        let hours = '';
                        if (company.rabota_ot1 && company.rabota_do1)
                            hours = company.rabota_ot1 + " - " + company.rabota_do1;
                        return hours;
                    },
                    "Sat-Sun": (company) => {
                        let weekends;
                        if (company.rabota_ot6 && company.rabota_do6) {
                            weekends = company.rabota_ot6 + "-" + company.rabota_do6;
                        } else
                            weekends = "Выходные";
                        return weekends;
                    }
                },
                "skype": "skype",
                "employeesNumber": "chisl",
                "yearOfFoundation": "osn",
                "bankDetails": {
                    "companyRegistrationNumber": "zkpo_int",
                    "bank": "bank",
                    "MFO": "mfo",
                    "INN": "r_r"
                },
                "productsAndOffers": "prod_russian",
                "branches": (company) => {
                    let branches = null;
                    if (company.fil)
                        branches = company.fil.split(";\r\n");
                    return branches;
                },
                "trademarks": "trade_mark",
                "categoriesId": (company) => {
                    let categories = null;
                    if (company.catalog_kved_mva)
                        categories = company.catalog_kved_mva.split(",");
                    return categories;
                },
                "companyRegionsId": (company) => {
                    let regions = null;
                    if (company.catalog_koatuu_mva)
                        regions = company.catalog_koatuu_mva.split(",");
                    return regions;
                },
                "exportRegionsID": (company) => {
                    let countries = null;
                    if (company.export_countries_mva) {
                        countries = company.export_countries_mva.split(",");
                        if (countries[0] === '')
                            countries.shift();
                    }
                    return countries;
                },
                "importRegionsId": (company) => {
                    let countries = null;
                    if (company.import_countries_mva) {
                        countries = company.import_countries_mva.split(",");
                        if (countries[0] === '')
                            countries.shift();
                    }
                    return countries;
                },
                "qualityStandarts": "yakist",
                "sitesUrl": "web"
            };
            const schemaShortCompany = {
                "slug": "subdomain",
                "name": "name_jur",
                "emails": (company) => {
                    let emails = null;
                    if (company.email)
                        emails = company.email.split(" , ");
                    // const emailContact = company.email_contact;
                    // if (emailContact && !emails.includes(emailContact))
                    //     emails.push(emailContact);
                    return emails;
                },
                "regionName": (company) => {
                    let region = null;
                    if (company.address_actual_russian)
                        region = company.address_actual_russian.split(",")[0];
                    return region;
                },
                "phones": (company) => {
                    let phone = '';
                    if (company.cod1 && company.t1)
                        phone = "+38 (" + company.cod1 + ") " + company.t1;
                    return phone;
                },
                "productsAndOffers": "prod_russian",
                "categoriesId": (company) => {
                    let categories = null;
                    if (company.catalog_kved_mva)
                        categories = company.catalog_kved_mva.split(",");
                    return categories;
                },
                "companyRegionsId": (company) => {
                    let regions = null;
                    if (company.catalog_koatuu_mva)
                        regions = company.catalog_koatuu_mva.split(",");
                    return regions;
                },
            };

            for (let i = 0; i < len; i++) {
                const company = results[i];

                const filteredFullCompany = getFieldsBySchema(schemaFullCompany, company);
                const filteredShortCompany = getFieldsBySchema(schemaShortCompany, company);

                filteredFullCompanies.push(filteredFullCompany);
                filteredShortCompanies.push(filteredShortCompany);
            }

            repo.insertFullCompanies(filteredFullCompanies);
            repo.insertShortCompanies(filteredShortCompanies);
        });
    };



    const transferRegions = () => {
        const conn = mysqlConnection.makeConnection(config.sqlDb);
        //
        const worldLevelId = 724;
        const countriesSql = "SELECT id,name_ukrainian,name_english FROM catalog_koatuu WHERE level = 1 AND id=1";
        const regionSql = "SELECT id,name_ukrainian,name_english FROM catalog_koatuu WHERE level=2";


        const wholeWorld = {
            "slug": "whole-world",
            "_id": new ObjectID().toString() ,
        };
        const ukraineCountry = {
                "slug": "ukraine",
                "_id": new ObjectID().toString() ,
                "parent_id": wholeWorld._id,
                ancestors: [
                    {
                        "name": "Весь світ",
                        "_id": wholeWorld._id,
                        "slug": "whole-world"
                    },
                ]
        };

        const schemaUkraineSubRegion = {
            "slug": (company) => {
                if (company.name_english)
                    return company.name_english.toLowerCase();
            },
            "name": "name_ukrainian",
            "parent_id": ukraineCountry._id,
            "ancestors": [
                {
                    "name": "Весь світ",
                    "_id": wholeWorld._id,
                    "slug": "whole-world"
                },
                {
                    "name": "Україна",
                    "_id": ukraineCountry._id,
                    "slug": "ukraine"
                },
            ]
        };
        conn.query(regionSql, (err, results, fields) => {
            if (err)
                console.log(err);

            //parse regions
            const subUkrRegionsLength = results.length;
            const filteredRegions = [wholeWorld,ukraineCountry];
            for (let i = 0; i < subUkrRegionsLength; i++) {
                const region = results[i];
                filteredRegions.push(getFieldsBySchemaWithPredefined(schemaUkraineSubRegion, region));
            }
            enterprisesController.insertRegions(filteredRegions);
        });
    };

    //TODO: divide to modules
    const transferToFullCompany = () => {
    };
    const transferToShortCompany = () => {
    };

    return {
        transferCompanies,
        transferRegions
    };
};

module.exports = transfer;