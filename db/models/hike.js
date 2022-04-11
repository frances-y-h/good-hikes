'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hike = sequelize.define('Hike', {
    cityParkId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    length: DataTypes.NUMERIC,
    elevationChange: DataTypes.INTEGER,
    difficultyId: DataTypes.INTEGER,
    routeTypeId: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT
  }, {});
  Hike.associate = function(models) {
    // associations can be defined here
  };
  return Hike;
};