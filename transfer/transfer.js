const db = require('./config/db-mysql');
const parser = require('./helpers/parser');
const matchTables = require('./helpers/match-tables');
const {enterpriseSchema, regionSchema, categorySchema} = require('./schema/schemas');

//Controllers
const enterprisesController = require('../controllers/enterprises.controller')();
const regionsController = require('../controllers/regions.controller')();
const categoriesController = require('../controllers/categories.controller')();

const transfer = function () {
	db.connect();

	const transferEnterprises = function () {
		db.get().then((conn) => {
			const amountOfEnterprises = 10000;
			const sql = 'SELECT *FROM enterprises JOIN enterprises_logo as logo ON ' +
				'enterprises.id = logo.enterprises_id LIMIT ?';

			conn.query(sql, amountOfEnterprises, (err, enterprises) => {
				if (err) {
					console.log(err);
					return;
				}

				const filteredFullEnterprises = [];
				const filteredShortEnterprises = [];

				enterprises.forEach((enterprise) => {
					const filteredFullEnterprise = parser.getFieldsBySchema(enterpriseSchema.fullEnterprise, enterprise, matchTables);
					const filteredShortEnterprise = parser.getFieldsBySchema(enterpriseSchema.shortEnterprise, enterprise, matchTables);

					filteredFullEnterprises.push(filteredFullEnterprise);
					filteredShortEnterprises.push(filteredShortEnterprise);
				});

				enterprisesController.insertShortEnterprises(filteredShortEnterprises).then((msg) => {
					console.log(msg);
					enterprisesController.insertFullEnterprises(filteredFullEnterprises).then((msg) => {
						console.log(msg);
					}).catch((msg) => {
						console.log(msg);
					});
				}).catch((msg) => {
					console.log(msg);
				});
			});
		}).catch((err) => {
			console.log('Error:' + err);
		});
	};

	const transferRegions = function () {
		db.get().then((conn) => {

			//TODO: add other countries parser
			// const worldId = 724;
			// const countriesSql = "SELECT id,name_ukrainian,name_english FROM catalog_koatuu WHERE level = 1 AND id=1";
			const subRegionsSql = 'SELECT id,name_ukrainian,name_english FROM catalog_koatuu WHERE level=2';
			const citiesSubRegionsSql = 'SELECT id,parent_id,name_ukrainian,name_english FROM catalog_koatuu WHERE level=3';

			//get sub regions
			conn.query(subRegionsSql, (err, subRegions) => {
				if (err) {
					console.log(err);
					return;
				}
				//get cities of sub regions
				conn.query(citiesSubRegionsSql, (err, citiesSubRegions) => {
					if (err) {
						console.log(err);
						return;
					}

					matchTables.regionsIds.set(724, regionSchema.world._id);
					matchTables.regionsIds.set(1, regionSchema.country._id);

					const filteredCitiesSubRegions = [];
					const filteredSubRegions = subRegions.map((subRegion) => {
						const filteredSubRegion = parser.getFieldsBySchemaWithPredefined(regionSchema.createSubRegionSchema(), subRegion);

						//cities sub region parser
						const citiesSubRegion = citiesSubRegions.filter((citiesSubRegion) => {
							return citiesSubRegion.parent_id === subRegion.id;
						});
						citiesSubRegion.forEach((city) => {
							const filteredCity = parser.getFieldsBySchemaWithPredefined(regionSchema.createCitySubRegionSchema(filteredSubRegion), city);
							filteredCitiesSubRegions.push(filteredCity);
							matchTables.regionsIds.set(city.id, filteredCity._id);
						});

						matchTables.regionsIds.set(subRegion.id, filteredSubRegion._id);
						return filteredSubRegion;
					});

					const filteredRegions = [regionSchema.world, regionSchema.country].concat(filteredSubRegions).concat(filteredCitiesSubRegions);
					regionsController.insertRegions(filteredRegions).then((msg) => {
						console.log(msg);
					}).catch((msg) => {
						console.log(msg);
					});
				});
			});
		}).catch((err) => {
			console.log('Error:' + err);
		});
	};

	const transferCategories = function () {
		db.get().then((conn) => {
			const highCategoriesSql = 'SELECT id,name_ukrainian,name_eng FROM catalog_kved WHERE level = 1';
			const mediumCategoriesSql = 'SELECT id,name_ukrainian,name_eng,parent_id FROM catalog_kved WHERE level=2';
			const lowCategoriesSql = 'SELECT id,name_ukrainian,name_eng,parent_id FROM catalog_kved WHERE level=3';

			conn.query(highCategoriesSql, (err, highCategories) => {
				if (err) {
					console.log(err);
					return;
				}
				conn.query(mediumCategoriesSql, (err, mediumCategories) => {
					if (err) {
						console.log(err);
						return;
					}
					conn.query(lowCategoriesSql, (err, lowCategories) => {
						if (err) {
							console.log(err);
							return;
						}

						const filteredMediumCategories = [];
						const filteredLowCategories = [];
						//high level
						const filteredHighCategories = highCategories.map((highCategory) => {
							const filteredHighCategory = parser.getFieldsBySchemaWithPredefined(categorySchema.createHighSchema(), highCategory);

							//medium level
							mediumCategories.forEach((mediumCategory) => {
								if (mediumCategory.parent_id === highCategory.id) {
									const filteredMediumCategory = parser.getFieldsBySchemaWithPredefined(categorySchema.createMediumSchema(filteredHighCategory), mediumCategory);

									//lowLevel
									lowCategories.forEach((lowCategory) => {
										if (lowCategory.parent_id === mediumCategory.id) {
											const filteredLowCategory = parser.getFieldsBySchemaWithPredefined(
												categorySchema.createLowSchema(filteredHighCategory, filteredMediumCategory), lowCategory);

											matchTables.categoriesIds.set(lowCategory.id, filteredLowCategory._id);
											filteredLowCategories.push(filteredLowCategory);
										}
									});

									matchTables.categoriesIds.set(mediumCategory.id, filteredMediumCategory._id);
									filteredMediumCategories.push(filteredMediumCategory);
								}
							});

							matchTables.categoriesIds.set(highCategory.id, filteredHighCategory._id);
							return filteredHighCategory;
						});

						//insert data
						categoriesController.insertCategories(filteredHighCategories.concat(filteredMediumCategories, filteredLowCategories))
							.then((msg) => {
								console.log(msg);
							}).catch((msg) => {
								console.log(msg);
							});
					});
				});
			});
		}).catch((err) => {
			console.log('Error:' + err);
		});
	};

	return {
		transferEnterprises,
		transferRegions,
		transferCategories
	};
};

module.exports = transfer;