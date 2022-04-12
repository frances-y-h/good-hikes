const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const db = require('../db/models');

// Hikes page


// Get 1 specific hikes
router.get('/:hikeId(\\d+)', asyncHandler(async (req, res) => {
  const hikeId = parseInt(req.params.hikeId, 10);
  const hike = await db.Hike.findByPk(hikeId, {
    include: [
      db.Tag,
      db.CityPark,
      db.State,
      db.Difficulty,
      db.RouteType]
  });
  const reviews = await db.Review.findAll({ where: { hikeId } });


  let avgReview = 0;
  for (let review of reviews) {
    avgReview += review.rating;
  }
  avgReview = (avgReview / reviews.length);

  res.render('hike', {
    title: hike.name,
    hike,
    reviews,
    avgReview,
  })
}));


module.exports = router;
