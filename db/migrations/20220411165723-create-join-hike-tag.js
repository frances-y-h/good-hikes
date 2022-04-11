"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("JoinHikeTags", {
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
            tagId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "Tags" },
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
        return queryInterface.dropTable("JoinHikeTags");
    },
};
