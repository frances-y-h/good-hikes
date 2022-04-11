"use strict";
module.exports = (sequelize, DataTypes) => {
    const Difficulty = sequelize.define(
        "Difficulty",
        {
            level: { type: DataTypes.STRING, unique: true, allowNull: false },
        },
        {}
    );

    Difficulty.associate = function (models) {
        Difficulty.hasMany(models.Hike, { foreignKey: "difficultyId" });
    };
    return Difficulty;
};
