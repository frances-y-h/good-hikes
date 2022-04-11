const express = require('express');
const bcrypt = require('bcryptjs');
const  router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { loginUser, restoreUser, logoutUser, requireAuth } = require('../auth');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

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


module.exports = router;
