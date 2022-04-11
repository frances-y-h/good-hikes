"use strict";
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define(
        "Tag",
        {
            name: { type: DataTypes.STRING, unique: true, allowNull: false },
        },
        {}
    );
    Tag.associate = function (models) {
        const columnMapping = {
            through: "JoinHikeTag", //  model name referencing join table
            otherKey: "hikeId",
            foreignKey: "tagId",
        };

        Tag.belongsToMany(models.Hike, columnMapping);
    };
    return Tag;
};
