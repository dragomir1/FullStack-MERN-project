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

router.get('/', (req, res) => {
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

// @route POST api/posts/like/:like_id
// @desc  liking a post
// @access Private

router.post('/like/:like_id', passport.authenticate("jwt", {session: false}), (req, res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.like_id)
      .then(post => {
        // we need to check if the user already liked this post
        if(post.likes.filter(like =>
          // req.user.id).length > 0 => what this means is that the use already liked it..the id
            like.user.toString() === req.user.id).length > 0) {
              return res.status(400).json({alreadyLiked: "user already liked this post"});
            }
            // add user id to the likes array
            post.likes.unshift({user: req.user.id});
            post.save().then(post => res.json(post));
      })
      .catch(err => res.status(400).json({error: "error"}))
    })
});

// @route POST api/posts/unlike/:like_id
// @desc  liking a post
// @access Private

router.post('/unlike/:like_id', passport.authenticate("jwt", {session: false}), (req, res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.like_id)
      .then(post => {
        // we need to check if the user already liked this post
        if(post.likes.filter(like =>
          // req.user.id).length > 0 => what this means is that the use already liked it..the id
            like.user.toString() === req.user.id).length === 0) {
              return res.status(400).json({notliked: "you have not liked this post"});
            }

            // remove index...
            const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post))
      })
      .catch(err => res.status(400).json({error: "error"}))
    })
});

// @route POST api/posts/comment
// @desc  adding a comment to a post
// @access Private

router.post('/comment/:post_id', passport.authenticate("jwt", {session: false}), (req, res) => {
  // destructing => const {errors, isValid}
  const {errors, isValid} = validatePostInput(req.body);

  // check post validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

  Post.findById(req.params.post_id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      // add to comments array:
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({error: "post not found"}))
});


// @route DELETE api/posts/comment/:post_id/:comment_id
// @desc  deleting comment to a post
// @access Private

router.delete('/comment/:post_id/:comment_id', passport.authenticate("jwt", {session: false}), (req, res) => {
  // destructing => const {errors, isValid}


  Post.findById(req.params.post_id)
    .then(post => {
      // we need to check if user has a comment
      if(post.comments.filter(comment =>
        comment._id.toString() === req.params.comment_id
      ).length === 0) {
        return res.status(404).json({error: "you have no comment for this post"});
      }

      // remove index...
      const removeIndex = post.comments
      .map(item => item._id.toString())
      .indexOf(req.params.comment_id)

      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({error: "post not found"}))
});


module.exports = router;
