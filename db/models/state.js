'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    abbreviation: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  State.associate = function(models) {
    // associations can be defined here
  };
  return State;
};