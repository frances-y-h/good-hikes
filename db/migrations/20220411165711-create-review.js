'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Reviews", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		userId: {
			allowNull: false,
			type: Sequelize.INTEGER,
      references: {model: "Users"},
		},
		hikeId: {
			allowNull: false,
			type: Sequelize.INTEGER,
      references: { model: "Hikes"},
		},
		rating: {
			allowNull: false,
			type: Sequelize.INTEGER,
		},
		comment: {
			type: Sequelize.TEXT,
		},
		dateHike: {
			type: Sequelize.DATEONLY,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};