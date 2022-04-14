const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");
const { check, validationResult } = require("express-validator");

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
			include: db.Hike,
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
		
		// console.log(userCollections);
		// console.log('/////****/////*****/// */ */');


		res.render("collection", {
			collectionName,
			userCollections,
			displayHikes
		});

}));


router.get('/edit', csrfProtection, requireAuth, asyncHandler( async(req, res) => {

	const userId = parseInt(req.session.auth.userId, 10);

	//grab collections to display list on left column
	const collections = await db.Collection.findAll({
		where: {
			userId: userId,
		},
	});


	res.render("collection-edit", {
		collections,
		csrfToken: req.csrfToken(),
	});

}));

const collectionValidator = [
	check('collectionname')
		.exists({ checkFalsy: true })
		.withMessage("Please enter a name for the collection")
		.isLength({ max: 255 })
		.withMessage("Collection name must not be longer than 255 characters")
		.custom((value) => {
			return db.Collection.findOne({ where: { name: value }})
				.then( (collection) => {
					if (collection) {
						return Promise.reject("Collection name already exists.");
					}
				});
		})
];

//route from the /collections/edit page to create a new collection
// get to route when submitting form on the edit page to add a new collection

//NEEDS CSRF PROTECTION
router.post('/edit/new',
		csrfProtection,
		collectionValidator,
		requireAuth,
		asyncHandler( async (req, res) => {
	
	const { collectionname } = req.body;
	const userId = req.session.auth.userId;

	//pull all collections for the logged in user
	const collections = await db.Collection.findAll({
		where: {
			userId: userId,
		},
	});
	
	const validationErrors = validationResult(req);
	let errors = [];

	if (validationErrors.isEmpty()) {
		//need to create the new collection line in database
		await db.Collection.create({
			userId,
			name: collectionname
		});
		res.redirect('/collections/edit');
	} else {

		const errors = validationErrors.array().map((err) => err.msg);

		res.render('collection-edit', {
			errors,
			csrfToken: req.csrfToken(),
			collectionname,
			collections
		})
	}

}));

//route from /collections/edit page to rename a collection
router.post('/:id(\\d+)/edit',
	requireAuth,
	asyncHandler( async (req, res) =>{
	const collectionId = await parseInt(req.params.id, 10);

	console.log('-------hello from the name edit page for ', collectionId);

	//take in user input

	res.redirect('/collections/edit');
}));


router.patch("/:id(\\d+)",
	requireAuth, 
	collectionValidator,
	asyncHandler(async (req, res) => {

		const { name } = req.body;
		const collectionId = await parseInt(req.params.id, 10);

		console.log("-------hello from the name edit page for ", collectionId);

		const collection = await db.Collection.findByPk(collectionId);

		collection.name = name;
		await collection.save();

		res.json({
			message: 'Success',
			collection
		});

		//take in user input

		// res.redirect("/collections/edit");


	})
);




//route from the collections/edit to delete a collection
router.post('/:id(\\d+)/delete',
		csrfProtection,
		requireAuth,
		asyncHandler( async (req, res) =>{
	const collectionId = await parseInt(req.params.id, 10);

	await db.Collection.destroy({where: {id: collectionId} });
	
	
	// res.render('collection-edit', {
	// 	csrfToken: req.csrfToken()
	// });

	res.redirect('/collections/edit');
	
}));

module.exports = router;
