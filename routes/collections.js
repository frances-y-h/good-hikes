const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");

// Collections page

//redirect /collections to default collection, with id 1
router.get("/", asyncHandler(async (req, res) => {
    res.redirect('/collections/1')
}));

// Get specific collections
router.get('/:collectionId(\\d+)', asyncHandler( async (req, res) => {
    const collectionId = await parseInt(req.params.collectionId, 10);
    const collection = await db.Collection.findByPk(collectionId);
    
    const hikes = 0;

    console.log(collection);

    res.render("collection", {
        title: collection.name,
        collection,
        hikes
    });

}));


// Get 1 specific hikes
// router.get(
// 	"/:hikeId(\\d+)",
// 	asyncHandler(async (req, res) => {
// 		const hikeId = parseInt(req.params.hikeId, 10);
// 		const hike = await db.Hike.findByPk(hikeId, { include: db.Tag });
// 		const reviews = await db.Review.findAll({ where: { hikeId } });

// 		res.render("hike", {
// 			title: hike.name,
// 			hike,
// 			reviews,
// 		});
// 	})
// );

module.exports = router;
