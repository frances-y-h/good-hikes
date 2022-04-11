"use strict";
module.exports = (sequelize, DataTypes) => {
    const CityPark = sequelize.define(
        "CityPark",
        {
            name: { type: DataTypes.STRING, unique: true, allowNull: false },
        },
        {}
    );
    CityPark.associate = function (models) {
        CityPark.hasMany(models.Hike, { foreignKey: "cityParkId" });
    };
    return CityPark;
};
