var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const { csrfProtection, asyncHandler, handleValidationErrors, } = require('./utils');
const { loginUser } = require('../auth');

// backend falidating the user input
const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];


// get the login page, using csrfProtection middleware
router.get('/login', csrfProtection, (req, res, next) => {
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
});

// post request to login the user
router.post('/login',
  csrfProtection,
  loginValidators,
  // handleValidationErrors,
  asyncHandler(async (req, res) => {

    //destructuring the user input from request body
    const { email, password } = req.body;

    // declaring errors array for the post /users//login route
    let errors = [];

    // checking if the user input is valid using express-validator
    const validatorErrors = validationResult(req);

    // if the user input is valid
    if (validatorErrors.isEmpty()) {

      // checking if the user exists in the database
      const user = await db.User.findOne({ where: { email } });

      // if the user exists
      if (user !== null) {
        // checking if the password is matching the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

        // if the password is matching
        if (passwordMatch) {
          // login the user and redirect to the home page
          loginUser(req, res, user);
          return res.redirect('/');
        }
      }

      // if the user does not exist or the password is not matching
      errors.push('Login failed for the provided email address and password')
    } else {
      // if the user input is not valid
      errors = validatorErrors.array().map(error => error.msg);
    }

    res.render('login', {
      title: 'Login',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));


module.exports = router;
