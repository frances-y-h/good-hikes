'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cityParkId: {
        type: Sequelize.INTEGER
      },
      stateId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.NUMERIC
      },
      elevationChange: {
        type: Sequelize.INTEGER
      },
      difficultyId: {
        type: Sequelize.INTEGER
      },
      routeTypeId: {
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Hikes');
  }
};