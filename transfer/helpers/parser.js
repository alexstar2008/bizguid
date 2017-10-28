
const getFieldsBySchema = (schema, company, matchTables = {}) => {
	const filterCompany = {};

	for (const schemaKey in schema) {
		const value = schema[schemaKey];

		if (typeof value === 'string') {
			if (company[value])
				filterCompany[schemaKey] = company[value];
		}
		else if (typeof value === 'function') {
			const result = value(company, matchTables);
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

	for (const schemaKey in schema) {
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

			if (Object.keys(newFields).length !== 0) {
				if (!filterCompany[schemaKeyObject])
					filterCompany[schemaKeyObject] = {};
				Object.assign(filterCompany[schemaKeyObject], newFields);
			}
		}
	}
	return filterCompany;
};

module.exports = {getFieldsBySchema, getFieldsBySchemaWithPredefined};