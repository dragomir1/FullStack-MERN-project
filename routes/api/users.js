const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// load input validation
const validateRegisterInput= require('../../validation/register');
const validateLoginInput= require('../../validation/login');



// @route GET api/user/userTest
// @desc  tests get route
// @access PUBLIC

router.get('/userTest', (req, res) => res.json({msg: "users works"}));


// @route GET api/users/register
// @desc  Register user
// @access PUBLIC

router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

// check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {

        const avatar = gravatar.url(req.body.email, {
          s: '200', //Size
          r: 'pg', //Rating
          d: 'mm' //Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json({user}))
            .catch(err => console.log(err))
        });
      })
    }
  });
});


// @route GET api/users/login
// @desc  login user return JWT token
// @access PUBLIC

router.post('/login', (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);

  // check login
    if(!isValid) {
      return res.status(400).json(errors);
    }


  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({email})
    .then(user => {
      // check for user
      if(!user) {
        errors.email = 'user not found';
        return res.status(404).json(errors);
      }

      // check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // user matched
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            } //created payload for jwt

            // sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600 * 24000},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            errors.password = 'password incorrect';
            return res.status(400).json(errors);
          }
        })
    });
});

// @route GET api/users/currentUser
// @desc  return current user
// @access private

router.get('/currentUser', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
});

module.exports = router;
