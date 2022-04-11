'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RouteTypes', [
      {name: "Loop", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Out & back", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Point to Point", createdAt: new Date(), updatedAt: new Date(),},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RouteTypes', null, {});
  }
};
