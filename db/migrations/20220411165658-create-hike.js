"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Hikes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cityParkId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "CityParks" },
            },
            stateId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "States" },
            },
            name: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            length: {
                allowNull: false,
                type: Sequelize.NUMERIC(5, 1),
            },
            elevationChange: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            difficultyId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "Difficulties" },
            },
            routeTypeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "RouteTypes" },
            },
            imgUrl: {
                allowNull: false,
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable("Hikes");
    },
};
