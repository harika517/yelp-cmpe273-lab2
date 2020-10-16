/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth, checkAuth } = require('../../../config/passportjwt');
const User = require('../../../models/User');
const UserProfile = require('../../../models/UserProfile');

auth();
// @route  GET api/profile/me
// @Desc   get current user profile
// @access Private
router.get('/me', checkAuth, async(req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user.id }).populate('user', ['userName', 'image']);
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

router.post('/', [checkAuth, [
    check('contact', 'Contact is required.').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }

    // build profile object
    const { contact, headline } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (contact) profileFields.contact = contact;
    if (headline) profileFields.headline = headline;
    try {
        let profile = await UserProfile.findOne({ user: req.user.id });
        if (profile) {
            // update
            profile = await UserProfile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        //create

        profile = new UserProfile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;