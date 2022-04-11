'use strict';
module.exports = (sequelize, DataTypes) => {
  const RouteType = sequelize.define('RouteType', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false, },
  }, {});
  RouteType.associate = function(models) {
    // associations can be defined here
  };
  return RouteType;
};
