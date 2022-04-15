"use strict";
module.exports = (sequelize, DataTypes) => {
    const Hike = sequelize.define(
        "Hike",
        {
            cityParkId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            stateId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            length: {
                allowNull: false,
                type: DataTypes.NUMERIC(5, 1),
            },
            elevationChange: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            difficultyId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            routeTypeId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            imgUrl: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
        },
        {}
    );
    Hike.associate = function (models) {
        Hike.belongsTo(models.CityPark, { foreignKey: "cityParkId" });
        Hike.belongsTo(models.State, { foreignKey: "stateId" });
        Hike.belongsTo(models.RouteType, { foreignKey: "routeTypeId" });
        Hike.belongsTo(models.Difficulty, { foreignKey: "difficultyId" });

        const columnMapping2 = {
            through: "JoinHikeTag",
            otherKey: "tagId",
            foreignKey: "hikeId",
        };

        Hike.belongsToMany(models.Tag, columnMapping2);

        const columnMapping4 = {
            through: "JoinHikeCollection",
            otherKey: "collectionId",
            foreignKey: "hikeId",
        };
        Hike.belongsToMany(models.Collection, columnMapping4);
        Hike.hasMany(models.Review, { foreignKey: "hikeId" });
    };
    return Hike;
};
