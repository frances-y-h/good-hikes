const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');


//validation for the review form
const reviewValidators = [
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Rating'),
    check('dateHike')
        .custom(dateHike => {
            let today = new Date();
            let enteredDate = new Date(dateHike);
            if (enteredDate > today) {
                throw Error('Date of hike must be in the past');
            }
            return true;
        })
];

router.put('/:reviewId(\\d+)', requireAuth, reviewValidators, asyncHandler(async (req, res) => {

    // destructing the request body
    let { hikeId, rating, comment, dateHike } = req.body;

    //finding reviewId
    const reviewId = parseInt(req.params.reviewId, 10);

    //finding userId
    const userId = req.session.auth.userId;

    //getting the review from the database
    let reviewToUpdate = await db.Review.findByPk(reviewId);



    // checkPermission(reviewToUpdate, res.locals.user)

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
    reviewToUpdate.userId = userId;
    reviewToUpdate.hikeId = hikeId;
    reviewToUpdate.rating = rating;
    reviewToUpdate.comment = comment;
    reviewToUpdate.dateHike = dateHike;

    //checking if the input for the review is valid
    const validationErrors = validationResult(req);


    //if the review is valid, save it to the database
    if (validationErrors.isEmpty()) {

        await reviewToUpdate.save();


        //response to the frontend page
        res.json({
            message: "Success",
            reviewToUpdate
        });
    } else {
        //if review is not valid, send the errors to the frontend
        const errors = validationErrors.array().map(err => err.msg);


        //response to the frontend page,
        //including the errors, built reveiew(for prepopoulating the form),
        //and the user
        res.json({
            message: "Error",
            errors,
            reviewToUpdate
        });
    }
}));

router.delete('/:reviewId', requireAuth, asyncHandler(async (req, res) => {

    //getting hikeId from the request
    const { hikeId } = req.body;


    // If user is logged in
    let loggedInUserId;
    if (req.session.auth) {
        loggedInUserId = req.session.auth.userId;
    }

    //finding reviewId
    const reviewId = parseInt(req.params.reviewId, 10);

    //getting the review from the database
    const reviewToDelete = await db.Review.findByPk(reviewId);

    //delete the review from the database
    await reviewToDelete.destroy();

    //getting updated reviews from the database
    const reviewsUpdated = await db.Review.findAll({
        where: { hikeId },
        include: [db.User],
        limit: 10,
        order: [["createdAt", "DESC"]]
    });

    //response to the frontend page
    res.json({ message: 'Success',
        reviewsUpdated,
        loggedInUserId
    });

}));


module.exports = router;
