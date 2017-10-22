const {ObjectID} = require('mongodb');

const world = {
    "slug": "whole-world",
    "_id": new ObjectID().toString(),
};
const country = {
    "slug": "ukraine",
    "_id": new ObjectID().toString(),
    "parent_id": world._id,
    ancestors: [
        {
            "name": "Весь світ",
            "_id": world._id,
            "slug": "whole-world"
        },
    ]
};
const createSubRegionSchema = () => {
    return {
        "_id": new ObjectID().toString(),
        "slug": (company) => {
            if (company.name_english)
                return company.name_english.toLowerCase();
        },
        "name": "name_ukrainian",
        "parent_id": country._id,
        "ancestors": [
            {
                "name": "Весь світ",
                "_id": world._id,
                "slug": "whole-world"
            },
            {
                "name": "Україна",
                "_id": country._id,
                "slug": "ukraine"
            },
        ]
    }
};

const createCitySubRegionSchema = (subRegion) => {
    return {
        "_id": new ObjectID().toString(),
        "slug": (city) => {
            if (city.name_english)
                return city.name_english.toLowerCase();
        },
        "name": "name_ukrainian",
        "parent_id": subRegion._id,
        "ancestors": [
            {
                "name": "Весь світ",
                "_id": world._id,
                "slug": "whole-world"
            },
            {
                "name": "Україна",
                "_id": country._id,
                "slug": "ukraine"
            },
            {
                "name": subRegion.name,
                "_id": subRegion._id,
                "slug": subRegion.slug
            },
        ]
    }
};
module.exports = {world, country, createSubRegionSchema ,createCitySubRegionSchema};