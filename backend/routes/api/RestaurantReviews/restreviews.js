const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const auth = require('../../../middleware/auth');

// @route  GET /api/reviews/restaurant/:restuser_id
// @Desc   Get all the reviews for a particular restuser
// @access Public

router.get('/restaurant/:restuser_id', async(req, res) => {
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.params.restuser_id });

        const reviews = await restprofile.reviews;
        if (reviews.length === 0) return res.status(400).json({ msg: 'There are no reviews for this restaurant' });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT /api/reviews/customer/:restuser_id
// @Desc   Add reviews to a rest user
// @access Private

router.put('/customer/:restuser_id', [auth, [
    check('rating', 'rating is required').not().isEmpty(),
    check('review', 'review is required').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        rating,
        review,
    } = req.body;

    const newReview = {
        rating,
        review,
    };
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.params.restuser_id });
        restprofile.reviews.unshift(newReview);
        await restprofile.save();
        res.json(restprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/reviews/restaurant
// @Desc   Get all the current restuser's reviews 
// @access Private

router.get('/restaurant', auth, async(req, res) => {
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        const reviews = await restprofile.reviews;
        if (reviews.length === 0) return res.status(400).json({ msg: 'There is no reviews for this restaurant' });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;