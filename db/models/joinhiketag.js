'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinHikeTag = sequelize.define(
		"JoinHikeTag",
		{
			hikeId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			tagId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{}
  );
  JoinHikeTag.associate = function(models) {
    // associations can be defined here
  };
  return JoinHikeTag;
};