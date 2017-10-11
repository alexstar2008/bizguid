const {ObjectID} = require('mongodb');

const createMediumSchema = (highLevelSchema) => {
    return {
        "_id": new ObjectID().toString(),
        "slug": (category) => {
            if (category.name_eng) {
                return category.name_eng.toLowerCase();
            }
        },
        "name": "name_ukrainian",
        "parent_id": highLevelSchema._id,
        ancestors: [
            {
                "name": highLevelSchema.name,
                "_id": highLevelSchema._id,
                "slug": highLevelSchema.slug
            },
        ]
    };
};
const createLowSchema = (highLevelSchema, mediumLevelSchema) => {
    return {
        "_id": new ObjectID().toString(),
        "slug": (category) => {
            if (category.name_eng) {
                return category.name_eng.toLowerCase();
            }
        },
        "name": "name_ukrainian",
        "parent_id": mediumLevelSchema._id,
        ancestors: [
            {
                "name": highLevelSchema.name,
                "_id": highLevelSchema._id,
                "slug": highLevelSchema.slug
            },
            {
                "name": mediumLevelSchema.name,
                "_id": mediumLevelSchema._id,
                "slug": mediumLevelSchema.slug
            },
        ]
    };
};

const createHighSchema = () => {
    return {
        "_id": new ObjectID().toString(),
        "slug": (category) => {
            if (category.name_eng) {
                return category.name_eng.toLowerCase();
            }
        },
        "name": "name_ukrainian"
    }
};

module.exports = {createLowSchema, createMediumSchema, createHighSchema};