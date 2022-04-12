const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");

// Collections page

//redirect /collections to default collection, with id 1
router.get("/", asyncHandler(async (req, res) => {
    console.log(req.session);
	
	//check if user is logged in


	//if not, redirect to sign in page

	//if user is logged in, need to pull the collections
	// associated with that user
	// find the completed hikes collection for that user
	// redirect the page to that collections url
	
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



module.exports = router;
