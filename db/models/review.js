"use strict";
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
        "Review",
        {
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            hikeId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            rating: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            comment: {
                type: DataTypes.TEXT,
            },
            dateHike: {
                type: DataTypes.DATEONLY,
            },
        },
        {}
    );
    Review.associate = function (models) {
        Review.belongsTo(models.User, { foreignKey: "userId" });
        Review.belongsTo(models.Hike, { foreignKey: "hikeId" });
    };
    return Review;
};
