const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");
const { check, validationResult } = require("express-validator");
const { NONAME } = require("dns");

// Collections page

//redirect /collections to default Completed collection
router.get(
    "/",
    requireAuth,
    asyncHandler(async (req, res) => {
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
                name: "Completed",
            },
        });

        //extract collection id to feed into redirect
        const defaultCollection = collection.dataValues.id;

        // redirect the page to that collections url
        res.redirect(`/collections/${defaultCollection}`);
    })
);

// Get specific collections
router.get(
    "/:collectionId(\\d+)",
    requireAuth,
    asyncHandler(async (req, res) => {
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
                },
            ],
        });

        //iterate through all the hikes in the array
        //add the average rating to them for display in collections page

        for (let i = 0; i < displayHikes.length; i++) {
            hikeId = displayHikes[i].id;
            //query for gathering all reviews from selected hikeId
            const reviews = await db.Review.findAll({
                where: { hikeId },
                include: [db.User],
                limit: 10,
                order: [["createdAt", "DESC"]],
            });

            //review calculation
            let avgReview = 0;
            for (let review of reviews) {
                avgReview += review.rating;
            }
            avgReview = (avgReview / reviews.length).toFixed(1);
            let avgReviewPtg = (avgReview / 5) * 100;

            //apply a new property to each hike object in the array
            displayHikes[i].avgReviewPtg = avgReviewPtg;
        }

        res.render("collection", {
            collectionName,
            userCollections,
            displayHikes,
        });
    })
);

router.get(
    "/edit",
    csrfProtection,
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.session.auth.userId, 10);

        //grab collections to display list on left column
        const collections = await db.Collection.findAll({
			where: {
				userId: userId,
			},
			include: db.Hike,
		});

        res.render("collection-edit", {
            collections,
            csrfToken: req.csrfToken(),
        });
    })
);

const collectionValidator = [
    check("collectionname")
        .exists({ checkFalsy: true })
        .withMessage("Please enter a name for the collection")
        .isLength({ max: 255 })
        .withMessage("Collection name must not be longer than 255 characters")
        .custom((value) => {
            return db.Collection.findOne({ where: { name: value } }).then(
                (collection) => {
                    if (collection) {
                        return Promise.reject(
                            "Collection name already exists."
                        );
                    }
                }
            );
        }),
];

//route from the /collections/edit page to create a new collection
// get to route when submitting form on the /collections/edit page to add a new collection
router.post(
    "/edit/new",
    csrfProtection,
    collectionValidator,
    requireAuth,
    asyncHandler(async (req, res) => {
        //pull inputted name from the request body
        const { collectionname } = req.body;
        const userId = req.session.auth.userId;

        //pull all collections for the logged in user
        const collections = await db.Collection.findAll({
			where: {
				userId: userId,
			},
			include: db.Hike,
		});

        //create validation obj and error array
        const validationErrors = validationResult(req);
        let errors = [];

        //if no errors
        if (validationErrors.isEmpty()) {
            //need to create the new collection line in database
            await db.Collection.create({
                userId,
                name: collectionname,
            });
            //refresh the page with new collection added
            res.redirect("/collections/edit");
        } else {
            //if there are errors, map the messages
            const errors = validationErrors.array().map((err) => err.msg);

            //re-render the page with error messages, and the input filled out with the user input
            res.render("collection-edit", {
                errors,
                csrfToken: req.csrfToken(),
                collectionname,
                collections,
            });
        }
    })
);

//default route from /collections/edit page to rename a collection
//all events are prevented
// router.post('/:id(\\d+)/edit',
// 	requireAuth,
// 	asyncHandler( async (req, res) =>{
// 	const collectionId = await parseInt(req.params.id, 10);
// 	console.log('-------hello from the name edit page for ', collectionId);
// 	//take in user input
// 	res.redirect('/collections/edit');
// }));

// route to patch the collection name
router.patch(
    "/:id(\\d+)",
    requireAuth,
    collectionValidator,
    asyncHandler(async (req, res) => {
        //pull the requested name from the form
        const { collectionname } = req.body;
        const collectionId = await parseInt(req.params.id, 10);

        //find the collection in the database to update name
        const collection = await db.Collection.findByPk(collectionId);

        //patch the name
        collection.name = collectionname;

        const validationErrors = validationResult(req);

        //if no errors
        if (validationErrors.isEmpty()) {
            //save the new name
            await collection.save();

            //send json to front end
            res.json({
                message: "Success",
                collection,
            });
        } else {
            const errors = validationErrors.array().map((err) => err.msg);

            //if errors, send them to the front end to display
            res.json({
                message: "Error",
                errors,
                collection,
            });
        }
    })
);

//route from the collections/edit to delete a collection
router.post(
    "/:id(\\d+)/delete",
    csrfProtection,
    requireAuth,
    asyncHandler(async (req, res) => {
        const collectionId = await parseInt(req.params.id, 10);

        await db.Collection.destroy({ where: { id: collectionId } });

        res.redirect("/collections/edit");
    })
);


//API route to delete a collection with hikes in it
router.delete('/:collectionId(\\d+)', asyncHandler(async (req, res) => {

	//inside here we find all hike colelctions tied to the collection id

	// if the length is none, party on wayne, delete the collection only

	// if there is something in that table, delete that first
	// then delete the line from collection

	//then party on garth



	const collectionId = parseInt(req.params.collectionId, 10);

	await db.Collection.destroy({ where: { id: collectionId } });

	res.json({message: 'Success' });

	// res.redirect("/collections/edit");
	

}))

/*
// API for adding hike to specific user's collections
router.post(
    "/:hikeId(\\d+)/collections",
    asyncHandler(async (req, res) => {
        const hikeId = parseInt(req.params.hikeId, 10);
        // get the array with collectionId and whether checked or not
        const collectionsToUpdate = req.body;

        // Itterate through the array and update the JoinHikeCollection table according to value
        for (let i = 0; i < collectionsToUpdate.length; i++) {
            let data = collectionsToUpdate[i];
            let collectionId = parseInt(data[0], 10);
            let value = data[1];

            const hikeCollection = await db.JoinHikeCollection.findOne({
                where: {
                    hikeId,
                    collectionId,
                },
            });

            // if value === true, make sure there is the record in table, else otherwize
            if (value) {
                if (!hikeCollection) {
                    await db.JoinHikeCollection.create({
                        hikeId,
                        collectionId,
                    });
                }
            } else {
                if (hikeCollection) {
                    await hikeCollection.destroy();
                }
            }
        }

        res.json({
            message: "Success",
        });
    })
);

*/





// /collections/ API
router.post(
    "/",
    collectionValidator,
    asyncHandler(async (req, res) => {
        const userId = req.session.auth.userId;
        const { collectionname } = req.body;

        const validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            const newCollection = await db.Collection.create({
                userId,
                name: collectionname,
            });
            res.json({
                message: "Success",
                newCollection,
            });
        } else {
            const errors = validationErrors.array().map((err) => err.msg);
            res.json({
                message: errors,
            });
        }
    })
);

module.exports = router;
