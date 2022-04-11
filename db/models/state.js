'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    abbreviation: { type: DataTypes.STRING, unique: true, allowNull: false, },
    state: { type: DataTypes.STRING, unique: true, allowNull: false, },
  }, {});
  State.associate = function(models) {
    // associations can be defined here
  };
  return State;
};
