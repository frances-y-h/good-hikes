'use strict';
module.exports = (sequelize, DataTypes) => {
  const CityPark = sequelize.define('CityPark', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false, }
  }, {});
  CityPark.associate = function(models) {
    // associations can be defined here
  };
  return CityPark;
};
