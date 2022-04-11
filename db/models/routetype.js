"use strict";
module.exports = (sequelize, DataTypes) => {
    const RouteType = sequelize.define(
        "RouteType",
        {
            name: { type: DataTypes.STRING, unique: true, allowNull: false },
        },
        {}
    );
    RouteType.associate = function (models) {
        RouteType.hasMany(models.Hike, { foreignKey: "routeTypeId" });
    };
    return RouteType;
};
