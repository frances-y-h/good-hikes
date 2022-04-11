'use strict';
module.exports = (sequelize, DataTypes) => {
  const CityPark = sequelize.define('CityPark', {
    name: DataTypes.STRING
  }, {});
  CityPark.associate = function(models) {
    // associations can be defined here
  };
  return CityPark;
};