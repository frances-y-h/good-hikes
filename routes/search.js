const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { Op } = require("sequelize");

//TO DO: optimize Code so only one db request: add reviews to hikes table and
// then could then use javascript (nested, nested for loop) to calculate avg

//ONLY ONE ROUTE: GET SEARCH PAGE
router.get(
    "/",
    asyncHandler(async (req, res) => {
        // console.log(req.path);

        //req.query automatically stores anything after a ?xx= parameter in the url as a non-encoded sting
        //req.query also automatically stores key/value pairs &key=value
        let searchQuery = req.query.query;
        let searchQueryArr = searchQuery.split(" ");

        ////////////TO DO PARSE AND SANITIZE SEARCH QUERY/////////////
        ////////////TO DO ADD CSS STYLING SO filters applied are colored upon refresh and removed when clear/////////////

        //PARSE OUT FILTER QUERIES
        const filters = req.query;
        // console.log(filters);

        let sort = null;
        let difficulty = [];
        let length = null;
        let elevationChange = null;
        let routeType = [];
        let rating = null;
        let tagsSuit = [];
        let tagsAtt = [];

        if (filters.sort) sort = filters.sort;
        if (filters.difficulty) difficulty = filters.difficulty.split("-");
        if (filters.length) length = filters.length;
        if (filters.elevationChange) elevationChange = filters.elevationChange;
        if (filters.rating) {
            //4=any,3=3,2 = 4,1 = 4.5
            if (filters.rating === "4") rating = 0;
            if (filters.rating === "3") rating = 3;
            if (filters.rating === "2") rating = 4;
            if (filters.rating === "1") rating = 4.5;
        }

        if (filters.routeType) routeType = filters.routeType.split("-");
        if (filters.suitability) tagsSuit = filters.suitability.split("-");
        if (filters.attractions) tagsAtt = filters.attractions.split("-");

        //CREATE DEFAULT FORM-DATA OBJECT TO PASS TO SEARCH.PUG
        const formData = {
            sort: {
                alphabetical: "true", //default
                popular: "false",
                shortest: "false",
                difficulty: "false",
            },
            difficulty: {
                easy: "false",
                moderate: "false",
                hard: "false",
            },
            length: "50", //default
            elevationChange: "5000", //default
            routeType: {
                loop: "false",
                outBack: "false",
                point: "false",
            },
            rating: "4", //default
            //- 2 Fee, 11 Parking, 13 Paved, 12	Restrooms, 14 No dogs, 15 Dogs Allowed
            tagsSuit: {
                fee: "false",
                parking: "false",
                paved: "false",
                rest: "false",
                noDogs: "false",
                yesDogs: "false",
            },

            tagsAtt: {
                backpacking: "false",
                forest: "false",
                lake: "false",
                noShade: "false",
                river: "false",
                views: "false",
                waterfall: "false",
                wildlife: "false",
                wildflowers: "false",
            },
        };

        //UPDATE FORM-DATA BASED ON FILTERS SELECTED
        formData.sort[sort] = "true";
        if (length) formData.length = length;
        if (elevationChange) formData.elevationChange = elevationChange;
        if (rating) formData.rating = rating;

        difficulty.forEach((num) => {
            if (num === "1") formData.difficulty.easy = "true";
            if (num === "2") formData.difficulty.moderate = "true";
            if (num === "3") formData.difficulty.hard = "true";
        });

        routeType.forEach((num) => {
            if (num === "1") formData.routeType.loop = "true";
            if (num === "2") formData.routeType.outBack = "true";
            if (num === "3") formData.routeType.point = "true";
        });

        //- 2 Fee, 11 Parking, 13 Paved, 12	Restrooms, 14 No dogs, 15 Dogs Allowed
        tagsSuit.forEach((num) => {
            if (num === "2") formData.tagsSuit.fee = "true";
            if (num === "11") formData.tagsSuit.parking = "true";
            if (num === "13") formData.tagsSuit.paved = "true";
            if (num === "12") formData.tagsSuit.rest = "true";
            if (num === "14") formData.tagsSuit.noDogs = "true";
            if (num === "15") formData.tagsSuit.yesDogs = "true";
        });

        //- 1	Backpacking, 3	Forest, 4	Lake, 5	No shade, 6	River,
        //- 7	Views, 8	Waterfall, 10	Wildlife, 9	Wildflowers
        tagsAtt.forEach((num) => {
            if (num === "1") formData.tagsAtt.backpacking = "true";
            if (num === "3") formData.tagsAtt.forest = "true";
            if (num === "4") formData.tagsAtt.lake = "true";
            if (num === "5") formData.tagsAtt.noShade = "true";
            if (num === "6") formData.tagsAtt.river = "true";
            if (num === "7") formData.tagsAtt.views = "true";
            if (num === "8") formData.tagsAtt.waterfall = "true";
            if (num === "10") formData.tagsAtt.wildlife = "true";
            if (num === "9") formData.tagsAtt.wildflowers = "true";
        });

        //CREATE WHERE CLAUSES FOR MAIN DATABASE REQUEST:

        //OR CLAUSES:
        //for each word in the search query, create 3 OR clauses
        //[Op.ilike] just resolves to a string, it is a form of destructuring a symbol
        const orClauses = searchQueryArr.reduce((acc, searchQuery) => {
            acc.push({ name: { [Op.iLike]: `%${searchQuery}%` } });
            acc.push({ "$CityPark.name$": { [Op.iLike]: `%${searchQuery}%` } });
            acc.push({ "$State.state$": { [Op.iLike]: `%${searchQuery}%` } });
            acc.push({ "$Tags.name$": { [Op.iLike]: `%${searchQuery}%` } });
            return acc;
        }, []);

        //AND CLAUSES:
        const andClauses = [];
        ///add each selected filters as a AND clause
        andClauses.push({ "$Hike.difficultyId$": { [Op.or]: difficulty } });
        andClauses.push({ "$Hike.length$": { [Op.lte]: parseInt(length) } });
        andClauses.push({
            "$Hike.elevationChange$": { [Op.lte]: elevationChange },
        });
        andClauses.push({ "$Hike.routeTypeId$": { [Op.or]: routeType } });
        // avgRating not available in first DB request, hikes will be filtered by ratings later
        andClauses.push({ "$Tags.id$": { [Op.or]: tagsSuit } });
        andClauses.push({ "$Tags.id$": { [Op.or]: tagsAtt } });

        //ORDER BY CLAUSES:
        let orderClause = ["name", "ASC"]; //default is alphabetical
        // if (sort === "alphabetical") orderClause = ["name", "ASC"];
        // Most popular sorted at end instead, depends on data on another DB request
        if (sort === "shortest") orderClause = ["length", "ASC"];
        if (sort === "difficulty") orderClause = ["difficultyId", "ASC"];

        // FETCH HIKES FROM DATABASE BASED ON SEARCH QUERY AND FILTERS
        let hikes;

        //check to see if submitted by navbar search Bar or advanced search page
        if (length === null) {
            console.log("Search Bar");
            hikes = await db.Hike.findAll({
                include: [
                    db.Tag,
                    db.CityPark,
                    db.State,
                    db.Difficulty,
                    db.RouteType,
                ],
                where: { [Op.or]: orClauses },
            });
        } else {
            hikes = await db.Hike.findAll({
                include: [
                    db.Tag,
                    db.CityPark,
                    db.State,
                    db.Difficulty,
                    db.RouteType,
                    db.Review,
                ],
                where: { [Op.and]: [{ [Op.or]: orClauses }, andClauses] },
                order: [orderClause],
            });
        }

        //ADD RATING DATA TO HIKE OBJECTS
        //If hike search result grab avg rating from each hike
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

            //grab review data from the database for the list of hikeIds
            const avgReviews = await db.sequelize.query(sql, {
                replacements: { ids: hikeIds },
                type: db.sequelize.QueryTypes.SELECT, //tells sequel to only return the result, no metadata
            });

            // console.log(avgReviews); //returns array of hike objects
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

                const timeMin = parseFloat(hike.length) * 25;
                hike.min = Math.round(timeMin % 60);
                hike.hr = Math.round((timeMin - hike.min) / 60);
            }
        }

        //FILTER HIKES BY RATING
        const finalHikes = hikes
            .filter((hike) => {
                //rating was transformed to proper value based on key
                //formValue 4 = any, formValue 3 = 3, formValue 2 = 4, formValue 1 = 4.5
                return hike.avgReview >= rating;
            })
            .sort((a, b) => {
                //if popular selected, SORT by avg rating
                if (formData.sort.popular === "true") {
                    return b.reviewCount - a.reviewCount;
                }
                return 0;
            });

        //RENDER SEARCH PAGE
        res.render("search", {
            searchQuery,
            finalHikes,
            formData,
        });
    })
);

module.exports = router;
