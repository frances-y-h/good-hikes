'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define(
		"Collection",
		{
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
		},
		{}
  );
  Collection.associate = function(models) {
    // associations can be defined here
  };
  return Collection;
};