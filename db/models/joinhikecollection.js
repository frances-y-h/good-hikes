'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinHikeCollection = sequelize.define('JoinHikeCollection', {
    hikeId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER
  }, {});
  JoinHikeCollection.associate = function(models) {
    // associations can be defined here
  };
  return JoinHikeCollection;
};