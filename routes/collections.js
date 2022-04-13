const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");

// Collections page

//redirect /collections to default collection, with id 1
router.get("/", requireAuth, asyncHandler(async (req, res) => {
	
	//requireAuth middleware handles the log in check
		//check if user is logged in
		// if not logged in, redirect to sign in page
				
		//if user is logged in, need to pull the collections
		// associated with that user
		const userId = parseInt(req.session.auth.userId, 10);
		
		//find default collection
		//per user stories, default display will be 'Completed' collection
		const collection = await db.Collection.findOne({
						where: {
							userId: userId,
							name: 'Completed',
						}
					});
		
		//extract collection id to feed into redirect
		const defaultCollection = collection.dataValues.id;
		
		// redirect the page to that collections url
		res.redirect(`/collections/${defaultCollection}`);
	}));
	
	// Get specific collections
	router.get('/:collectionId(\\d+)', requireAuth, asyncHandler( async (req, res) => {
		
		//once redirected, or sent to a collection page
		//user is authorized with requireAuth
		
		//grab userId
		const userId = parseInt(req.session.auth.userId, 10);

		//grab collections to display list on left column
		const userCollections = await db.Collection.findAll({
			where: {
				userId: userId,
			},
		});

		//extract the current collectionId from the url
		const collectionId = await parseInt(req.params.collectionId, 10);
		
		//extract the name of the current collection for
		// the header over the list of hikes in collection page
		const currentCollection = await db.Collection.findByPk(collectionId);
		const collectionName = currentCollection.name;

		//pull all hikes to display, filter by collection ID
		// include referenced tables
		const displayHikes = await db.Hike.findAll({
			include: [
				db.CityPark,
				db.Difficulty,
				db.RouteType,
				db.State,
				{
					model: db.Collection,
					where: collectionId,
				}
			],
		});
		
		console.log(userCollections[0]);


		res.render("collection", {
			collectionName,
			userCollections,
			displayHikes
		});

}));



module.exports = router;
