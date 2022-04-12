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
		
		//if logged in
	
		const userId = parseInt(req.session.auth.userId, 10);
			
		console.log('-----------------=-=-=-=-=-=-=-userId', userId);
		console.log(req.session.auth);
		
		//if user is logged in, need to pull the collections
		// associated with that user
		
		//find default collection
		//per user stories, default display will be 'Completed' collection
		const collection = await db.Collection.findOne({
						where: {
							userId: userId,
							name: 'Completed',
						}
					});
		
		const defaultCollection = collection.dataValues.id;
		
		// redirect the page to that collections url
		res.redirect(`/collections/${defaultCollection}`);
	}));
	
	// Get specific collections
	router.get('/:collectionId(\\d+)', requireAuth, asyncHandler( async (req, res) => {
		
		//once redirected, or sent to a collection page
		//user is authorized with requireAuth
		
		//grab userId



		const collectionId = await parseInt(req.params.collectionId, 10);
		const collection = await db.Collection.findByPk(collectionId);
		
		const hikes = 0;

		// console.log(collection);

		res.render("collection", {
			title: collection.name,
			collection,
			hikes
		});

}));



module.exports = router;
