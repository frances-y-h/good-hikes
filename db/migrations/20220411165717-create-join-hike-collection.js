'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("JoinHikeCollections", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		hikeId: {
			allowNull: false,
			type: Sequelize.INTEGER,
      references: { model: "Hikes" },
		},
		collectionId: {
			allowNull: false,
			type: Sequelize.INTEGER,
      references: { model: "Collections" },
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
    return queryInterface.dropTable('JoinHikeCollections');
  }
};