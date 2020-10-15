// handling authentication using jwt, passport-jwt
// registering and adding users
const express = require('express');
const { auth, checkAuth } = require('../../../config/passportjwt');
// const tokenAuth = require('../../../middleware/tokenAuth')
const User = require('./models/User');

const router = express.Router();
auth();
// @route  GET api/auth
// @Desc   Test route
// @access Public
router.get('/', checkAuth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;