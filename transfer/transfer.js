const db = require('./db-mysql');
const {enterpriseSchema, regionSchema, categorySchema} = require('./schema/schemas');
const parser = require('./helpers/parser');

const enterprisesController = require('../controllers/enterprises.controller')();
const regionsController = require('../controllers/regions.controller')();
const categoriesController = require('../controllers/categories.controller')();


const matchTables = {
    regionsIds: new Map(),
    categoriesIds: new Map()
};

const transfer = function () {
    db.connect();

    const transferEnterprises = function () {
        db.get().then((conn) => {
            const amountOfEnterprises = 10000;
            const sql = "SELECT *FROM enterprises JOIN enterprises_logo as logo ON " +
                "enterprises.id = logo.enterprises_id LIMIT ?";

            conn.query(sql, amountOfEnterprises, (err, enterprises) => {
                if (err)
                    console.log(err);
                const enterprisesLength = enterprises.length;

                const filteredFullEnterprises = [];
                const filteredShortEnterprises = [];

                for (let i = 0; i < enterprisesLength; i++) {
                    const enterprise = enterprises[i];

                    const filteredFullEnterprise = parser.getFieldsBySchema(enterpriseSchema.fullEnterprise, enterprise, matchTables);
                    const filteredShortEnterprise = parser.getFieldsBySchema(enterpriseSchema.shortEnterprise, enterprise, matchTables);

                    filteredFullEnterprises.push(filteredFullEnterprise);
                    filteredShortEnterprises.push(filteredShortEnterprise);
                }

                enterprisesController.insertFullEnterprises(filteredFullEnterprises);
                enterprisesController.insertShortEnterprises(filteredShortEnterprises);
            });
        });
    };

    const transferRegions = function () {
        db.get().then((conn) => {

            //TODO: add other countries parser
            // const worldId = 724;
            // const countriesSql = "SELECT id,name_ukrainian,name_english FROM catalog_koatuu WHERE level = 1 AND id=1";
            const subRegionsSql = "SELECT id,name_ukrainian,name_english FROM catalog_koatuu WHERE level=2";
            const citiesSubRegionsSql = "SELECT id,parent_id,name_ukrainian,name_english FROM catalog_koatuu WHERE level=3";

            conn.query(subRegionsSql, (err, subRegions) => {
                if (err)
                    console.log(err);

                conn.query(citiesSubRegionsSql,(err,citiesSubRegions)=>{

                    matchTables.regionsIds.set(724, regionSchema.world._id);
                    matchTables.regionsIds.set(1, regionSchema.country._id);

                    const filteredSubRegions = subRegions.map((subRegion) => {
                        const filteredSubRegion = parser.getFieldsBySchemaWithPredefined(regionSchema.createSubRegionSchema(), subRegion);

                        //TODO parser for sub sub region
                        const citiesSubRegion  = citiesSubRegions.filter((citiesSubRegion)=>{
                            return citiesSubRegion.parent_id === subRegion.id;
                        });

                        matchTables.regionsIds.set(subRegion.id, filteredSubRegion._id);
                        return filteredSubRegion;
                    });
                    const filteredRegions = [regionSchema.world, regionSchema.country].concat(filteredSubRegions);

                    // regionsController.insertRegions(filteredRegions);
                });
            });
        });
    };

    const transferCategories = function () {
        db.get().then((conn) => {
            const highCategoriesSql = "SELECT id,name_ukrainian,name_eng FROM catalog_kved WHERE level = 1";
            const mediumCategoriesSql = "SELECT id,name_ukrainian,name_eng,parent_id FROM catalog_kved WHERE level=2";
            const lowCategoriesSql = "SELECT id,name_ukrainian,name_eng,parent_id FROM catalog_kved WHERE level=3";

            conn.query(highCategoriesSql, (err, highCategories) => {
                if (err)
                    console.log(err);
                conn.query(mediumCategoriesSql, (err, mediumCategories) => {
                    if (err)
                        console.log(err);
                    conn.query(lowCategoriesSql, (err, lowCategories) => {
                        if (err)
                            console.log(err);


                        const filteredMediumCategories = [];
                        const filteredLowCategories = [];

                        const filteredHighCategories = highCategories.map((highCategory) => {
                            const filteredHighCategory =
                                parser.getFieldsBySchemaWithPredefined(categorySchema.createHighSchema(), highCategory);

                            //mediumLevel
                            const mediumCategoriesLength = mediumCategories.length;
                            for (let i = 0; i < mediumCategoriesLength; i++) {
                                const mediumCategory = mediumCategories[i];
                                if (mediumCategory.parent_id === highCategory.id) {
                                    const filteredMediumCategory = parser.getFieldsBySchemaWithPredefined(categorySchema.createMediumSchema(filteredHighCategory), mediumCategory);

                                    //lowLevel
                                    const lowCategoriesLength = lowCategories.length;
                                    for (let j = 0; j < lowCategoriesLength; j++) {
                                        const lowCategory = lowCategories[j];
                                        if (lowCategory.parent_id === mediumCategory.id) {
                                            const filteredLowCategory =
                                                parser.getFieldsBySchemaWithPredefined(
                                                    categorySchema.createLowSchema(filteredHighCategory, filteredMediumCategory), lowCategory);

                                            matchTables.categoriesIds.set(lowCategory.id, filteredLowCategory._id);
                                            filteredLowCategories.push(filteredLowCategory);
                                        }
                                    }
                                    matchTables.categoriesIds.set(mediumCategory.id, filteredMediumCategory._id);
                                    filteredMediumCategories.push(filteredMediumCategory);
                                }
                            }

                            matchTables.categoriesIds.set(highCategory.id, filteredHighCategory._id);
                            return filteredHighCategory;
                        });

                        //insert data
                        categoriesController.insertCategories(filteredHighCategories.concat(filteredMediumCategories, filteredLowCategories));
                    });
                });
            });
        });
    };

//TODO: divide to modules
    const transferToFullEnterprises = () => {
    };
    const transferToShortEnterprises = () => {
    };

    return {
        transferEnterprises,
        transferRegions,
        transferCategories
    };
};

module.exports = transfer;