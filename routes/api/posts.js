const express = require('express');
const router = express.Router();


// @route GET api/posts/postsTest
// @desc  tests get route
// @access PUBLIC
router.get('/postsTest', (req, res) => res.json({msg: "post works"}));


module.exports = router;
