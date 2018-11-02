const express = require('express');
const router = express.Router();
// dealing with database
const mongoose = require('mongoose');
// use this for protected routes
const passport = require('passport');

// load profile model
const Profile = require('../../models/Profile');

// load user model
const User = require('../../models/User');

// @route GET api/profile/profileTest
// @desc  tests get route
// @access PUBLIC

router.get('/profileTest', (req, res) => res.json({msg: "profile works"}));


// @route GET api/profile/profile
// @desc  gets curretn users profile
// @access private

// this is a protected route
router.get('/', passport.authenticate("jwt", {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({
    // this 'user' is from the Profile model that links the user to its id
    user: req.user.id
  })
    .then(profile => {
      if(!profile) {
        errors.noProfile = "profile not found for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
