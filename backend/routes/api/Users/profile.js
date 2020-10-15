// creating and updating profile
// registering and adding users
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route  POST api/profile
// @Desc   Test route
// @access Public
router.get('/updateContact', (req, res) => res.send('Profile Route'));

module.exports = router;