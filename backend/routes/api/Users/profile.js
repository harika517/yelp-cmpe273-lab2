/* eslint-disable indent */
/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { auth, checkAuth } = require('../../../config/passportjwt');
const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
const UserProfile = require('../../../models/UserProfile');

// auth();
// @route  GET api/profile/me
// @Desc   get current user profile
// @access Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user.id }).populate('user', ['userName', 'image', 'userEmail', 'firstName']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  POST api/profile
// @Desc   Create/ Update user profile
// @access Private

router.post('/', [auth, [
    check('contact', 'Contact is required.').not().isEmpty(),
    check('city', 'Please enter your city name').not().isEmpty(),
    check('state', 'Please enter your city name').not().isEmpty(),
    check('country', 'Please enter your country').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // build profile object
    const {
        contact,
        headline,
        dateOfBirth,
        city,
        state,
        country,
        nickName,
        yelpingSince,
        thingsILove,
        findmein,
        myBlog,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (contact) profileFields.contact = contact;
    if (headline) profileFields.headline = headline;
    if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
    if (city) profileFields.city = city;
    if (state) profileFields.state = state;
    if (country) profileFields.country = country;
    if (nickName) profileFields.nickName = nickName;
    if (yelpingSince) profileFields.yelpingSince = yelpingSince;
    if (thingsILove) profileFields.thingsILove = thingsILove;
    if (findmein) profileFields.findmein = findmein;
    if (myBlog) profileFields.myBlog = myBlog;

    try {
        let profile = await UserProfile.findOne({ user: req.user.id });
        if (profile) {
            // update
            profile = await UserProfile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        // create

        profile = new UserProfile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile
// @Desc   Get all profiles
// @access Public

router.get('/', async(req, res) => {
    try {
        const profiles = await UserProfile.find().populate('user', ['userName', 'image', 'firstName', 'lastName', 'userEmail']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile/user/:user_id
// @Desc   Get profile by user_id
// @access Public

router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.params.user_id }).populate('user', ['userName', 'userEmail', 'firstName', 'lastName', 'image']);
        if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Yelp Users

// Search for user using user's firstName or NickName

router.get('/searchuser/:word', async(req, res) => {
    try {
        const searchword = req.params.word;
        // console.log('searchuser', searchword);
        const user = await UserProfile.find({
            $or: [{ firstName: { $regex: `.*${searchword}.*` } },
                { nickName: { $regex: `.*${searchword}.*` } },
                { city: { $regex: `.*${searchword}.*` } },
                { state: { $regex: `.*${searchword}.*` } },
                { country: { $regex: `.*${searchword}.*` } },
            ],
        }).populate('user', ['userName', 'userEmail', 'firstName', 'lastName', 'image']);

        if (user.length === 0) {
            return res.status(400).json({ msg: 'There are no users with this name' });
        }
        // const results = [...userFN, ...userNN];
        // res.json({
        //     FirstName: userFN,
        //     NickName: userNN,
        // });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Search for user using user's firstName or NickName

router.get('/searchuserlocation/:word', async(req, res) => {
    try {
        const searchword = req.params.word;
        console.log('searchuser', searchword);
        const user = await UserProfile.find({
            $or: [{ city: { $regex: `.*${searchword}.*` } },
                { state: { $regex: `.*${searchword}.*` } },
                { country: { $regex: `.*${searchword}.*` } },
            ],
        });
        // console.log('searchuser result', user);
        if (user.length === 0) {
            return res.status(400).json({ msg: 'There are no users from this location' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;