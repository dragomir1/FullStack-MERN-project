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

// load input validation
const validateProfileInput= require('../../validation/profile');
const validateExperienceInput= require('../../validation/experience');
const validateEducationInput= require('../../validation/education');

// @route GET api/profile/profileTest
// @desc  tests get route
// @access PUBLIC
// router.get('/profileTest', (req, res) => res.json({msg: "profile works"}));


// @route GET api/profile/
// @desc  gets curretn users profile
// @access private

// this is a protected route
router.get('/', passport.authenticate("jwt", {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({
    // this 'user' is from the Profile model that links the user to its id
    user: req.user.id
  })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noProfile = "profile not found for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/handle/:handle
// @desc  get profile by handle
// @access public

// req.params.handle will match with :handle. it will grab whatever the :handle is in the url and match it to the handle in the database.

router.get('/handle/:handle',(req, res) => {
  const errors = {};
  Profile.findOne({handle: req.params.handle})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noProfile = "profile not found for this user";
      res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});


// @route GET api/profile/user/:user_id
// @desc  get profile by user id
// @access public

// req.params.handle will match with :handle. it will grab whatever the :handle is in the url and match it to the handle in the database.

router.get('/user/:user_id',(req, res) => {
  const errors = {};
  Profile.findOne({user: req.params.user_id})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noProfile = "profile not found for this user";
      res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json({profile:"this user doesn't exist"}));
});

// @route GET api/profile/all
// @desc  get all profiles
// @access public

router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.noProfile = "There are no profiles";
      res.status(404).json(errors);
    }
    res.json(profiles);
  })
  .catch(err => res.status(404).json({profiles:"there are no profiles"}));
});



// @route POST api/profile/
// @desc  create or edit user profile
// @access private

// this is a protected route
router.post('/', passport.authenticate("jwt", {session: false}), (req, res) => {
  const {errors, isValid} = validateProfileInput(req.body);

  // check profile validation
    if(!isValid) {
      return res.status(400).json(errors);
    }
  // get fields
  const profileFields = {};
  // get the logged in user.
  profileFields.user = req.user.id;

  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;

// skills = split into an array. split gives us an array of skills to put into database.
  if(typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }
// social  its' an array. so we need to initialize it.
  profileFields.social = {};

  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({user: req.user.id})
  .then(profile => {
    if(profile) {
      // update
      Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      )
      .then(profile => res.json(profile));
    } else {
      // create


      // check if handle exists
      Profile.findOne({handle: profileFields.handle})
        .then(profile => {
          if(profile) {
            errors.handle = "that handle already exists.";
            return res.status(400).json(errors);
          }
           // save profile
           new Profile(profileFields).save()
            .then(profile => res.json(profile));
        });
    }
  });
});

// @route POST api/profile/experience
// @desc  add experience to profiles
// @access private

router.post('/experience', passport.authenticate("jwt", {session: false}), (req, res) => {
  const {errors, isValid} = validateExperienceInput(req.body);

  // check experience validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

  Profile.findOne({user: req.user.id})
    .then(profile => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // this adds it to the beginning of the array
      profile.experience.unshift(newExperience);
      profile.save().then(profile => res.json(profile));
    })
});

// @route POST api/profile/education
// @desc  add education to profiles
// @access private

router.post('/education', passport.authenticate("jwt", {session: false}), (req, res) => {
  const {errors, isValid} = validateEducationInput(req.body);

  // check experience validation
    if(!isValid) {
      return res.status(400).json(errors);
    }
  Profile.findOne({user: req.user.id})
    .then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      profile.education.unshift(newEducation);
      profile.save().then(profile => res.json(profile));
    })
});

// @route Delete api/profile/experience/:exp_id
// @desc  delete experience from profiles
// @access private

router.delete('/experience/:exp_id', passport.authenticate("jwt", {session: false}), (req, res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      // get remove index
      const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)

      // splice out of array
      profile.experience.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    })
      .catch(err => res.status(404).json(err));
});

// @route Delete api/profile/education/:edu_id
// @desc  delete experience from profiles
// @access private

router.delete('/education/:edu_id', passport.authenticate("jwt", {session: false}), (req, res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      // get remove index
      const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.exp_id)

      // splice out of array
      profile.education.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    })
      .catch(err => res.status(404).json(err));
});


// @route Delete api/profile/
// @desc  delete user and profile
// @access private

router.delete('/', passport.authenticate("jwt", {session: false}), (req, res) => {
  Profile.findOneAndRemove({user: req.user.id})
  .then(() => {
    User.findOneAndRemove({_id: req.user.id})
    .then(() => res.json({sucess: true}))
  })
});
module.exports = router;
