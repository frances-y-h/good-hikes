"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            username: {
                type: DataTypes.STRING(50),
                unique: true,
                allowNull: false,
            },
            email: { type: DataTypes.STRING, unique: true, allowNull: false },
            hashedPassword: { type: DataTypes.STRING.BINARY, allowNull: false },
        },
        {}
    );
    User.associate = function (models) {
        User.hasMany(models.Review, { foreignKey: "userId" });
        User.hasMany(models.Collection, { foreignKey: "userId" });
    };
    return User;
};
