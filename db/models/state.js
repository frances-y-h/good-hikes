"use strict";
module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define(
        "State",
        {
            abbreviation: {
                type: DataTypes.STRING(4),
                unique: true,
                allowNull: false,
            },
            state: { type: DataTypes.STRING, unique: true, allowNull: false },
        },
        {}
    );
    State.associate = function (models) {
        State.hasMany(models.Hike, { foreignKey: "stateId" });
    };
    return State;
};
