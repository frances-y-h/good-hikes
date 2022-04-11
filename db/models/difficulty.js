'use strict';
module.exports = (sequelize, DataTypes) => {
  const Difficulty = sequelize.define('Difficulty', {
    level: DataTypes.STRING
  }, {});
  Difficulty.associate = function(models) {
    // associations can be defined here
  };
  return Difficulty;
};