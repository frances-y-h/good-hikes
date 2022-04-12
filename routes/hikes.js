const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const db = require('../db/models');

// Hikes page


// Get 1 specific hikes
router.get('/:hikeId(\\d+)', asyncHandler(async (req, res) => {
  const hikeId = parseInt(req.params.hikeId, 10);
  const hike = await db.Hike.findByPk(hikeId, {include: db.Tag});
  const reviews = await db.Review.findAll({ where: { hikeId } });


  res.render('hike', {
    title: hike.name,
    hike,
    reviews
  })
}));


module.exports = router;
