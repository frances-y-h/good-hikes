'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    hikeId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    dateHike: DataTypes.DATEONLY
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};