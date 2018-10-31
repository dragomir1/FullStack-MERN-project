const express = require('express');
const router = express.Router();



// @route GET api/profile/profileTest
// @desc  tests get route
// @access PUBLIC

router.get('/profileTest', (req, res) => res.json({msg: "profile works"}));


module.exports = router;
