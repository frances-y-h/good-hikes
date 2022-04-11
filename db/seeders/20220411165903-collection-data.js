'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Collections', [
      {userId:1, name: "Want To Hike", createdAt: new Date(), updatedAt: new Date(), },
      {userId:1, name: "Planned", createdAt: new Date(), updatedAt: new Date(), },
      {userId:1, name: "Completed", createdAt: new Date(), updatedAt: new Date(), },
      {userId:1, name: "California", createdAt: new Date(), updatedAt: new Date(), },
      {userId:1, name: "National Parks", createdAt: new Date(), updatedAt: new Date(), },
      {userId:1, name: "Dog Friendly", createdAt: new Date(), updatedAt: new Date(), },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Collections', null, {});
  }
};
