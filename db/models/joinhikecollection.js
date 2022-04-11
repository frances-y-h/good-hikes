'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinHikeCollection = sequelize.define(
		"JoinHikeCollection",
		{
			hikeId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			collectionId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{}
  );
  JoinHikeCollection.associate = function(models) {
    // associations can be defined here
  };
  return JoinHikeCollection;
};