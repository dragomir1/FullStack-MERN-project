const express = require('express');
const router = express.Router();


// @route GET api/user/userTest
// @desc  tests get route
// @access PUBLIC

router.get('/userTest', (req, res) => res.json({msg: "users works"}));


module.exports = router;
