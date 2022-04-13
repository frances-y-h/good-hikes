const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
// const { sequelize } = require("../db/models");

//Get the Search Page
router.get(
    "/",
    asyncHandler(async (req, res) => {
        // console.log(req.path);

        //req.query automatically stores anything after a ?xx= parameter in the url
        const searchQuery = req.query;
        // console.log(searchQuery);

        // fetch hikes based on query
        const hikes = await db.Hike.findAll({
            include: [
                db.Tag,
                db.CityPark,
                db.State,
                db.Difficulty,
                db.RouteType,
            ],
        });

        //grab average rating from each hike given a list of hikeIds
        const sql = `SELECT "hikeId", round(avg(rating),1) as avg
        FROM "Reviews"
        WHERE "hikeId" IN (:ids)
        GROUP BY "hikeId"`;

        const hikeIds = hikes.map((hike) => {
            return hike.id;
        });

        //returns array of objects
        //https://sequelize.org/docs/v6/core-concepts/raw-queries/
        const avgReviews = await db.sequelize.query(sql, {
            replacements: { ids: hikeIds },
            type: db.sequelize.QueryTypes.SELECT, //tells sequel to only return the result, no metadata
        });

        const avgReviewsMap = avgReviews.reduce((prev, curr) => {
            prev[curr.hikeId] = curr.avg;
            return prev;
        }, {});

        for (let hike of hikes) {
            hike.avgReview = avgReviewsMap[hike.id];
            hike.avgReviewPtg = avgReviewsMap[hike.id] * 20;
        }

        res.render("search", {
            searchQuery,
            hikes,
        });
    })
);

module.exports = router;
