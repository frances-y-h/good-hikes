"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "JoinHikeCollections",
            [
                {
                    hikeId: 42,
                    collectionId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 18,
                    collectionId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 32,
                    collectionId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 24,
                    collectionId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 12,
                    collectionId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 33,
                    collectionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 28,
                    collectionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 40,
                    collectionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 1,
                    collectionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 13,
                    collectionId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 11,
                    collectionId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 41,
                    collectionId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 21,
                    collectionId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 34,
                    collectionId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 21,
                    collectionId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 38,
                    collectionId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 18,
                    collectionId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 4,
                    collectionId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 41,
                    collectionId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 23,
                    collectionId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 27,
                    collectionId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 31,
                    collectionId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 46,
                    collectionId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 20,
                    collectionId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 14,
                    collectionId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 2,
                    collectionId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 48,
                    collectionId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 22,
                    collectionId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 48,
                    collectionId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 6,
                    collectionId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // ADDED 3 New Mexico Hikes for USER 2
                {
                    hikeId: 4,
                    collectionId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 5,
                    collectionId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    hikeId: 6,
                    collectionId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("JoinHikeCollections", null, {});
    },
};
