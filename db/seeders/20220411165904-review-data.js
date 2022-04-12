"use strict";

// import array of object records
const { reviewSeed } = require("../tables-seed-data");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Reviews", reviewSeed, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Reviews", null, {});
    },
};
