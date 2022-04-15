const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");




// Hikes page

// Get 1 specific hikes
router.get(
    "/:hikeId(\\d+)",
    asyncHandler(async (req, res) => {
        const hikeId = parseInt(req.params.hikeId, 10);
        const hike = await db.Hike.findByPk(hikeId, {
            include: [
                db.Tag,
                db.CityPark,
                db.State,
                db.Difficulty,
                db.RouteType,
            ],
        });
        
        //query for populating reviews section on /hikes/:hikeId page
        const reviews = await db.Review.findAll({
            where: { hikeId },
            include: [db.User],
            limit: 10,
            order: [["createdAt", "DESC"]],
        });
        
        //query for the bars on /hikes/:hikeId page
        const reviewsAll = await db.Review.findAll();
        
        //finding each rating percentage from all the ratings (for the bars)
        const avgRatingPercentage = [];
        for (let i = 1; i < 6; i++) {
            const ratingAmount = await db.Review.findAll({
                where: { rating: i },
            });
            let avg = ((ratingAmount.length / reviewsAll.length) * 100).toFixed(
                1
                );
                avgRatingPercentage.push(avg);
            }
            
            let avgReview = 0;
            for (let review of reviews) {
                avgReview += review.rating;
            }
            avgReview = (avgReview / reviews.length).toFixed(1);
            let avgReviewPtg = (avgReview / 5) * 100;
            
            let collections;
            let checkedCollections;
            let loggedInUserId;
            
            // If user is logged in
            if (req.session.auth) {
                const userId = req.session.auth.userId;
                loggedInUserId = req.session.auth.userId;
                
                // Grab all collections own by user
                collections = await db.Collection.findAll({
                    where: { userId },
                });
                
                // Grab which collections has current hike id
                checkedCollections = await db.Collection.findAll({
                    where: { userId },
                    include: [
                        {
                            model: db.Hike,
                            where: {
                                id: hikeId,
                            },
                        },
                    ],
                });
                
                // Turn collections with current hike id into set to save time complexity
                checkedCollections = new Set(checkedCollections.map((el) => el.id));
                
                // Add new field under collections to see whether the current hike is in the collection
                collections.forEach((el) => {
                    if (checkedCollections.has(el.id)) {
                        el.inCollection = true;
                    } else {
                        el.inCollection = false;
                    }
                });
            }
            

            const hikeDescription = [
                `Try this ${hike.length}-mile ${hike.RouteType.name.toLowerCase()}trail. It's considered to be ${hike.Difficulty.level.toLowerCase()} in difficulty. ${hike.name} is located in ${hike.CityPark.name}, ${hike.State.state}. Breathtaking views with ${hike.elevationChange} ft of elevation change. This is a popular trail for hiking, so expect to see fellow hikers out there with you.`,
                `${hike.State.state} has got some beautiful trails, and ${hike.name} will not disappoint. With ${hike.elevationChange} ft of elevation change, this ${hike.Difficulty.level.toLowerCase()} trail will get your blood flowing. Expect to see a few people, but not too many, for complete solitude, explore on a weekend. Located inside ${hike.CityPark.name} this beautiful ${hike.RouteType.name.toLowerCase()} jaunt is only ${hike.length} miles long.`,
                `What a complete joy ${hike.name} is. Not only is it in the wonderful state of ${hike.State.state}, but it's also considered ${hike.Difficulty.level.toLowerCase()} by most hikers. Take a ${hike.length} stroll on this ${hike.RouteType.name.toLowerCase()} trail in ${hike.CityPark.name}. At only ${hike.elevationChange} ft of elevation change, you can soak in the sun and breathe in some fresh air. Head out early to get all you can out of this trail.`,
                `The best trail to go to that is surprisingly not busy on the weekend? ${hike.name}. I know, I'm shocked too. Rated at ${hike.Difficulty.level.toLowerCase()}, this hike nestled in ${hike.State.state} gives you plenty to see. Located in ${hike.CityPark.name}, it's a measly ${hike.length} miles long, elevation change is only ${hike.elevationChange} ft, and it's simply best ${hike.RouteType.name.toLowerCase()} trail in the area! Just get out there already!`,
                `${hike.CityPark.name} has plenty to offer, but ${hike.name} should be at the top of your list. Topping out at ${hike.elevationChange} ft of elevation change, it's your simple ${hike.RouteType.name.toLowerCase()} trail, but the ${hike.State.state} air makes up for the ${hike.Difficulty.level.toLowerCase()} hike you're embarking on. Plenty of time to see everything and stop and smell the roses on this ${hike.length} mile hike, and still get home before it's dark.`,
                `${hike.RouteType.name} trails get you up in the morning? What about a little lift of, I don't know, say, ${hike.elevationChange} ft? Come out to ${hike.name} for your morning dose of nature. It's a popular trail because of all to see on it's ${hike.length} mile stroll in ${hike.State.state}'s ${hike.CityPark.name}. Come early to get parking, so you don't have to add too much to the hike. But if you can't find parking, don't worry, it's a very ${hike.Difficulty.level.toLowerCase()} hike. You got this.`,
                `${hike.elevationChange} ft. ${hike.RouteType.name}. ${hike.Difficulty.level}. You got it. Visit ${hike.State.state} for a long weekend and take a break from the city, come and see this ${hike.length} mile trail in ${hike.CityPark.name}. Come in the late afternoon to let the morning crowd thin out so you can really enjoy ${hike.name} like a local.`,
                `${hike.State.state}, can you do no wrong? You gave us ${hike.name}, and we cannot thank you enough. What did we deserve to enjoy the majesty you bring the world. Looking for something ${hike.Difficulty.level.toLowerCase()} to do this weekend? Check out this ${hike.RouteType.name.toLowerCase()} hike, heads up though it's got ${hike.elevationChange} ft of elevation change, nothing to laugh at on this ${hike.length} mile length trail. Plenty to enjoy, I can't think of anyone who doesn't love going to ${hike.CityPark.name}.`,
                `${hike.RouteType.name}, the tried and true trail. This ${hike.length} trail inside the wonderful state of ${hike.State.state} won't disappoint. ${hike.elevationChange} ft difference in the distance from our earth's core on ${hike.name}. There's always something to do in ${hike.CityPark.name}, so enjoy a long day outside with this ${hike.Difficulty.level.toLowerCase()} trail.`,
            ];

            thisHikeDescription = hikeDescription[(hike.id % (hikeDescription.length))];

            res.render("hike", {
                title: hike.name,
                hike,
                reviews,
                avgReview,
            avgReviewPtg,
            avgRatingPercentage,
            collections,
            loggedInUserId,
            thisHikeDescription
        });
    })
);

//validation for the review form
const reviewValidators = [
    check("rating")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Rating"),
    check("dateHike").custom((dateHike) => {
        let today = new Date();
        let enteredDate = new Date(dateHike);
        if (enteredDate > today) {
            throw Error("Date of hike must be in the past");
        }
        return true;
    }),
];

router.post(
    "/:hikeId(\\d+)/reviews",
    requireAuth,
    reviewValidators,
    asyncHandler(async (req, res) => {
        let { hikeId, rating, comment, dateHike } = req.body;
        const userId = req.session.auth.userId;

        //if there is no comment (which is optional)
        //set comment to null and send request to the database
        if (!comment) {
            comment = null;
        }

        //if there is no dateHike (which is optional)
        //set date to null and send request to the database
        if (!dateHike) {
            dateHike = null;
        }

        //creating a review for the database
        const review = db.Review.build({
            userId,
            hikeId,
            rating,
            comment,
            dateHike,
        });

        //checking if the input for the review is valid
        const validationErrors = validationResult(req);

        //find the owner of the review(the user)
        const user = await db.User.findOne({ where: { id: userId } });

        //if the review is valid, save it to the database
        if (validationErrors.isEmpty()) {
            await review.save();

            //response to the frontend page
            res.json({
                message: "Success",
                review,
                user,
            });
        } else {
            //if review is not valid, send the errors to the frontend
            const errors = validationErrors.array().map((err) => err.msg);

            //response to the frontend page,
            //including the errors, built reveiew(for prepopoulating the form),
            //and the user
            res.json({
                message: "Error",
                errors,
                review,
                user,
            });
        }
    })
);

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

// API route for deleting specific hike from collections
router.delete(
    "/:hikeId(\\d+)/collections",
    asyncHandler(async (req, res) => {
        const hikeId = parseInt(req.params.hikeId, 10);
        const collectionId = req.body.collectionId;
        console.log(req.body);
        const hikeCollection = await db.JoinHikeCollection.findOne({
            where: {
                hikeId,
                collectionId,
            },
        });
        if (hikeCollection) {
            await hikeCollection.destroy();
            res.json({
                message: "Success",
            });
        } else {
            res.json({
                message: "Something went wrong. Please try again",
            });
        }
    })
);

router.post(
    "/:hikeId(\\d+)/reviews",
    requireAuth,
    reviewValidators,
    asyncHandler(async (req, res) => {
        let { hikeId, rating, comment, dateHike } = req.body;
        const userId = req.session.auth.userId;

        //if there is no comment (which is optional)
        //set comment to null and send request to the database
        if (!comment) {
            comment = null;
        }

        //if there is no dateHike (which is optional)
        //set date to null and send request to the database
        if (!dateHike) {
            dateHike = null;
        }

        //creating a review for the database
        const review = db.Review.build({
            userId,
            hikeId,
            rating,
            comment,
            dateHike,
        });

        //checking if the input for the review is valid
        const validationErrors = validationResult(req);

        //find the owner of the review(the user)
        const user = await db.User.findOne({ where: { id: userId } });

        //if the review is valid, save it to the database
        if (validationErrors.isEmpty()) {
            const newReview = await review.save();

            //response to the frontend page
            res.json({
                message: "Success",
                review,
                user,
                newReviewId: newReview.id,
            });
        } else {
            //if review is not valid, send the errors to the frontend
            const errors = validationErrors.array().map((err) => err.msg);

            //response to the frontend page,
            //including the errors, built reveiew(for prepopoulating the form),
            //and the user
            res.json({
                message: "Error",
                errors,
                review,
                user,
            });
        }
    })
);

module.exports = router;

//Executing (default): INSERT INTO "Reviews" ("id","userId","hikeId","rating","comment","dateHike","createdAt","updatedAt") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7) RETURNING *;
