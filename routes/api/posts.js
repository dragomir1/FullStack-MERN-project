const express = require('express');
const router = express.Router();
// dealing with database
const mongoose = require('mongoose');
// use this for protected routes
const passport = require('passport');

// load models
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


const validatePostInput= require('../../validation/post');

// @route GET api/posts/postsTest
// @desc  tests get route
// @access PUBLIC
// router.get('/postsTest', (req, res) => res.json({msg: "post works"}));




// @route GET api/posts/allposts
// @desc  creating a post
// @access Poblic

router.get('/allposts', (req, res) => {
    const errors = {};
    Post.find()
    .sort({date: -1})
    .then(posts=> {
      if(!posts) {
        errors.noPosts = "There are no posts";
        res.status(404).json(errors);
      }
      res.json(posts);
    })
    .catch(err => res.status(404));
  });

// @route GET api/posts/:post_id
// @desc  creating a post
// @access Private

router.get('/:post_id', (req, res) => {
    Post.findById(req.params.post_id)
    .then(post => {
      if(!post) {
        errors.noPost = "There is no post";
        res.status(404).json(errors);
      }
      res.json(post);
    })
    .catch(err => res.status(404).json({noPost: "no post found with that ID"}));
  });

// @route Delete api/posts/:post
// @desc  creating a post
// @access Public

router.delete('/:post_id', passport.authenticate("jwt", {session: false}), (req, res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.post_id)
      .then(post => {
        // check for post owner and compare owner id..
        // the right side is a string. the left isnt. so we need to add method..to string..
        if(post.user.toString() !== req.user.id) {
          return res.status(401).json({notAuthorized: "not notAuthorized"});
        }
        // Delete
        post.remove().then(() => res.json({success: true}))
      })
      .catch(err => res.status(404).json({postnotfound: "no post found"}));

    })
});


// @route POST api/posts
// @desc  creating a post
// @access Private


router.post('/', passport.authenticate("jwt", {session: false}), (req, res) => {
  // destructing => const {errors, isValid}
  const {errors, isValid} = validatePostInput(req.body);

  // check post validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));
});

module.exports = router;
