'use strict';
module.exports = (sequelize, DataTypes) => {
  const Difficulty = sequelize.define('Difficulty', {
    level: { type: DataTypes.STRING, unique: true, allowNull: false, },
  }, {});
  Difficulty.associate = function(models) {
    // associations can be defined here
  };
  return Difficulty;
};
