'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Collections", {
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
		name: {
			allowNull: false,
			type: Sequelize.STRING,
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
    return queryInterface.dropTable('Collections');
  }
};