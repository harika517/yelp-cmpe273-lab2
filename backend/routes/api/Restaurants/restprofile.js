/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const auth = require('../../../middleware/auth');

// restauth();

// @route  GET api/restprofile/me
// @Desc   get current restaurant profile
// @access Private

router.get('/me', auth, async(req, res) => {
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.restuser.id }).populate('restuser', ['restName', 'location']);
        if (!restprofile) {
            return res.status(400).json({ msg: 'There is no profile for this restaurant' });
        }
        res.json(restprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  POST api/restprofile
// @Desc   Create/ Update restaurant profile
// @access Private

router.post('/', [auth, [
    check('contact', 'Contact is required.').not().isEmpty(),
    check('cuisine', 'Restaurant type is required').not().isEmpty(),
    check('timings', 'Restaurant timings are required').not().isEmpty(),
    check('DineIn', 'Please mention if this mode of delivery is available').not().isEmpty(),
    check('curbSidePickUp', 'Please mention if this mode of delivery is available').not().isEmpty(),
    check('yelpDelivery', 'Please mention if this mode of delivery is available').not().isEmpty(),

]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // build profile object
    const {
        contact,
        description,
        timings,
        cuisine,
        DineIn,
        curbSidePickUp,
        yelpDelivery,
    } = req.body;
    const restProfileFields = {};
    restProfileFields.restuser = req.restuser.id;
    if (contact) restProfileFields.contact = contact;
    if (description) restProfileFields.description = description;
    if (timings) restProfileFields.timings = timings;
    if (cuisine) restProfileFields.cuisine = cuisine;
    if (DineIn) restProfileFields.DineIn = DineIn;
    if (curbSidePickUp) restProfileFields.curbSidePickUp = curbSidePickUp;
    if (yelpDelivery) restProfileFields.yelpDelivery = yelpDelivery;
    try {
        let restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        if (restprofile) {
            // update
            restprofile = await RestProfile.findOneAndUpdate({ restuser: req.restuser.id }, { $set: restProfileFields }, { new: true });
            return res.json(restprofile);
        }
        // create

        restprofile = new RestProfile(restProfileFields);
        await restprofile.save();
        res.json(restprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/restprofile
// @Desc   get all the restaurant profiles
// @access Public

router.get('/', async(req, res) => {
    try {
        const profiles = await RestProfile.find().populate('restuser', ['restName', 'location']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/restprofile/restaurant/:restuser_id
// @Desc   get restaurant profile by restuser_id
// @access Public

router.get('/restaurant/:restuser_id', async(req, res) => {
    try {
        const profile = await RestProfile.findOne({ restuser: req.params.restuser_id }).populate('restuser', ['restName', 'location']);
        if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;