'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Difficulties', [
      {level: "Easy", createdAt: new Date(), updatedAt: new Date(),},
      {level: "Moderate ", createdAt: new Date(), updatedAt: new Date(),},
      {level: "Hard", createdAt: new Date(), updatedAt: new Date(),},
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Difficulties', null, {});
  }
};
