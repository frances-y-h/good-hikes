"use strict";
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
    Collection.associate = function (models) {
        Collection.belongsTo(models.User, { foreignKey: "userId" });

        const columnMapping3 = {
            through: "JoinHikeCollection", //  model name referencing join table
            otherKey: "hikeId",
            foreignKey: "collectionId",
        };

        Collection.belongsToMany(models.Hike, columnMapping3);
    };
    return Collection;
};
