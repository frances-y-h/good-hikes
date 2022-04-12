const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');


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
        const reviews = await db.Review.findAll({
          where: { hikeId },
          include: [db.User],
          limit: 10,
          order: [["createdAt", "DESC"]]
        });

        let avgReview = 0;
        for (let review of reviews) {
            avgReview += review.rating;
        }
        avgReview = (avgReview / reviews.length).toFixed(1);
        let avgReviewPtg = (avgReview / 5) * 100;

        res.render("hike", {
            title: hike.name,
            hike,
            reviews,
            avgReview,
            avgReviewPtg,
        });
}));

const reviewValidators = [
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Rating'),
  check('dateHike')
    .custom(dateHike => {
      let today = new Date();
      let enteredDate = new Date(dateHike);
      if (enteredDate > today) {
        throw Error ('Date of hike must be in the past');
      }
      return true;
    })
]

router.post('/:hikeId(\\d+)/reviews', reviewValidators, asyncHandler(async (req, res) => {
  console.log("hello from reviews post route")
  let { hikeId, rating, comment, dateHike } = req.body;
  const userId = req.session.auth.userId;

  if (!comment) {
    comment = null;
  }
  if (!dateHike) {
    dateHike = null;
  }

  const review = db.Review.build({
    userId,
    hikeId,
    rating,
    comment,
    dateHike
  });


  const validationErrors = validationResult(req);


  const user = await db.User.findOne({ where: { id: userId } });

  if (validationErrors.isEmpty()) {
    await review.save();

    res.json({
      message: "Success",
      review,
      user
    });
  } else {
    const errors = validationErrors.array().map(err => err.msg);

    res.json({
      message: "Error",
      errors,
      review,
      user
    });
  }
}));

module.exports = router;
