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

        res.render("hike", {
            title: hike.name,
            hike,
            reviews,
            avgReview,
            avgReviewPtg,
            avgRatingPercentage,
            collections,
            loggedInUserId,
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
