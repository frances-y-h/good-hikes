const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { Op } = require("sequelize");

//TO DO: optimize Get Code to one db request - to do could add reviews to
//the hikes table, and then use javascript (nested, nested for loop) to calculate avg

//Get the Search Page
router.get(
    "/",
    asyncHandler(async (req, res) => {
        // console.log(req.path);

        //req.query automatically stores anything after a ?xx= parameter in the url as a non-encoded sting
        let searchQuery = req.query.query;
        let searchQueryArr = searchQuery.split(" ");
        // console.log("QUERY:", searchQuery);

        //for each word in the search query, create 3 or clauses for the where constraint
        //[Op.ilike] just resolves to a string, it is a form of destructuring a symbol
        const orClauses = searchQueryArr.reduce((acc, searchQuery) => {
            acc.push({ name: { [Op.iLike]: `%${searchQuery}%` } });
            acc.push({ "$CityPark.name$": { [Op.iLike]: `%${searchQuery}%` } });
            acc.push({ "$State.state$": { [Op.iLike]: `%${searchQuery}%` } });
            return acc;
        }, []);

        // fetch hikes based on the search query
        const hikes = await db.Hike.findAll({
            include: [
                db.Tag,
                db.CityPark,
                db.State,
                db.Difficulty,
                db.RouteType,
            ],
            where: { [Op.or]: orClauses },
        });

        //If hike search has a result...
        //grab average rating from each hike given a list of hikeIds
        if (hikes.length > 0) {
            //raw sql query
            const sql = `SELECT "hikeId", round(avg(rating),1) as avg,
                        count(rating) as "reviewCount"
                        FROM "Reviews"
                        WHERE "hikeId" IN (:ids)
                        GROUP BY "hikeId"`;

            //grab list of hikeIds from search result
            const hikeIds = hikes.map((hike) => {
                return hike.id;
            });

            const avgReviews = await db.sequelize.query(sql, {
                replacements: { ids: hikeIds },
                type: db.sequelize.QueryTypes.SELECT, //tells sequel to only return the result, no metadata
            });
            // console.log(avgReviews); //returns array of objects
            // https://sequelize.org/docs/v6/core-concepts/raw-queries/

            //add avg property to each hike object
            //add avg % property to each hike object
            //add review count property to each hike object
            const avgReviewsMap = avgReviews.reduce((prev, curr) => {
                prev[curr.hikeId] = curr.avg;
                return prev;
            }, {});

            const reviewCountMap = avgReviews.reduce((prev, curr) => {
                prev[curr.hikeId] = curr.reviewCount;
                return prev;
            }, {});

            // console.log(avgReviewsMap,reviewCountMap);

            for (let hike of hikes) {
                hike.avgReview = avgReviewsMap[hike.id];
                hike.avgReviewPtg = avgReviewsMap[hike.id] * 20;
                hike.reviewCount = reviewCountMap[hike.id];
            }
        }

        //render search page
        res.render("search", {
            searchQuery,
            hikes,
        });
    })
);

module.exports = router;
