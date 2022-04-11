'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinHikeTag = sequelize.define('JoinHikeTag', {
    hikeId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  JoinHikeTag.associate = function(models) {
    // associations can be defined here
  };
  return JoinHikeTag;
};