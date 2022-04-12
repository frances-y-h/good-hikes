var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

/* GET about page. */
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us'
  });
});

module.exports = router;
