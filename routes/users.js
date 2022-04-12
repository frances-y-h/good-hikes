const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { loginUser, restoreUser, logoutUser, requireAuth } = require('../auth');





const signupValidator = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please enter username')
    .isLength({ max: 50 })
    .withMessage('Username must not be longer than 50 characters')
    .custom( value => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('Username already exists');
          }
        })
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm password and password does not match')
      }
      return true;
    })
];


router.get('/signup', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken(),
    user
  })
})

router.post('/signup', signupValidator, csrfProtection, asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = db.User.build({
    username,
    email
  });

  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res , user);
    res.redirect('/');
  } else {
    const errors = validationErrors.array().map(err => err.msg);
    res.render('signup', {
      title: 'Sign Up',
      errors,
      csrfToken: req.csrfToken(),
      user
    });
  }



}));



// backend validating the user input
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

router.post("/logout", (req, res) => {
	logoutUser(req, res);
	res.redirect("/");
});

module.exports = router;
