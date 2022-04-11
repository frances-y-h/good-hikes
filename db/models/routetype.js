'use strict';
module.exports = (sequelize, DataTypes) => {
  const RouteType = sequelize.define('RouteType', {
    name: DataTypes.STRING
  }, {});
  RouteType.associate = function(models) {
    // associations can be defined here
  };
  return RouteType;
};