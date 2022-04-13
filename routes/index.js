const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler } = require("./utils");
const Op = db.Sequelize.Op;

/* GET home page. */
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const [topRatedHikes] = await db.sequelize.query(`SELECT h.id AS id,
            CAST(SUM(r.rating) AS FLOAT)/COUNT(*) AS AvgRating, h.name, h.length, cp.name AS cpName, h."imgUrl", st.state AS state, diff.level AS level
            FROM "Hikes" AS h
            INNER JOIN "Reviews" AS r
            ON r."hikeId" = h.id
            INNER JOIN "CityParks" AS cp
            ON h."cityParkId" = cp.id
            INNER JOIN "States" AS st
            ON h."stateId" = st.id
            INNER JOIN "Difficulties" AS diff
            ON h."difficultyId" = diff.id
            GROUP BY h.id, cp.name, st.state, diff.level
            ORDER BY AvgRating DESC
            LIMIT 12
            ;`);
        const State = db.State;
        const Hike = db.Hike;

        const directories = await State.findAll({
            include: {
                model: Hike,
            },
            order: ["state"],
        });

        res.render("index", {
            title: "Welcome to Good Hikes",
            topRatedHikes,
            directories,
        });
    })
);

/* GET about page. */
router.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us",
    });
});

module.exports = router;
