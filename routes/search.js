const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");

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

        console.log(hikes[0].id);

        //grab average rating from each hike
        for (let hike of hikes) {
            const reviews = await db.Review.findAll({
                where: { hikeId: `${hike.id}` },
            });
            let avgReview = 0;
            for (let review of reviews) {
                avgReview += review.rating;
            }

            avgReview = (avgReview / reviews.length).toFixed(1);
            let avgReviewPtg = (avgReview / 5) * 100;
            hike.avgReview = avgReview;
            hike.avgReviewPtg = avgReviewPtg;
        }

        res.render("search", {
            searchQuery,
            hikes,
        });
    })
);

module.exports = router;
