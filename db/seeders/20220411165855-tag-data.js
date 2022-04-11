'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      {name: "Backpacking", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Fee", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Forest", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Lake", createdAt: new Date(), updatedAt: new Date(),},
      {name: "No shade", createdAt: new Date(), updatedAt: new Date(),},
      {name: "River", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Views", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Waterfall", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Wildflowers", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Wildlife", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Parking", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Restrooms", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Paved", createdAt: new Date(), updatedAt: new Date(),},
      {name: "No dogs ", createdAt: new Date(), updatedAt: new Date(),},
      {name: "Dogs Allowed", createdAt: new Date(), updatedAt: new Date(),},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tags', null, {});
    }
};
