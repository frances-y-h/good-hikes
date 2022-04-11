'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hike = sequelize.define(
		"Hike",
		{
			cityParkId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			stateId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				unique: true,
				type: DataTypes.STRING,
			},
			length: {
				allowNull: false,
				type: DataTypes.NUMERIC(5,1),
			},
			elevationChange: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			difficultyId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			routeTypeId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			imgUrl: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
		},
		{}
  );
  Hike.associate = function(models) {
    // associations can be defined here
  };
  return Hike;
};