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
        const hikes = await db.Hike.findAll({});

        res.render("search", {
            searchQuery,
            hikes,
        });
    })
);

module.exports = router;
