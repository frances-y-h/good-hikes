'use strict';

// import array of object records
const { hikeTagSeed } = require('../../public/javascripts/tables-seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('JoinHikeTags', hikeTagSeed, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('JoinHikeTags', null, {});
  }
};
