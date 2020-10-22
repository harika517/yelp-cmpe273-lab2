const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const SocialEvent = require('../../../models/SocialEvents');
const auth = require('../../../middleware/auth');

// @route  POST /api/events/restaurant
// @Desc   Create Events by current restaurant
// @access Private

router.post('/restaurant', [auth, [
    check('eventName', 'eventName is required').not().isEmpty(),
    check('eventDescription', 'eventDescription is required').not().isEmpty(),
    check('eventTimings', 'eventTimings is required').not().isEmpty(),
    check('eventDate', 'eventDate is required').not().isEmpty(),
    check('eventLocation', 'eventLocation is required').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        eventName,
        eventDescription,
        eventTimings,
        eventDate,
        eventLocation,
        eventHashtags,
    } = req.body;
    const restEventFields = {};
    restEventFields.restuser = req.restuser.id;
    if (eventName) restEventFields.eventName = eventName;
    if (eventDescription) restEventFields.eventDescription = eventDescription;
    if (eventTimings) restEventFields.eventTimings = eventTimings;
    if (eventDate) restEventFields.eventDate = eventDate;
    if (eventLocation) restEventFields.eventLocation = eventLocation;
    if (eventHashtags) restEventFields.eventHashtags = eventHashtags;

    try {
        let socialevent = await SocialEvent.findOne({ restuser: req.restuser.id });
        socialevent = new SocialEvent(restEventFields);
        await socialevent.save();
        res.json(socialevent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/events
// @Desc   Get all the events
// @access Public

router.get('/', async(req, res) => {
    try {
        const events = await SocialEvent.find().populate('restuser', ['restName', 'location']);
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/events/:event_id
// @Desc   Get Eventdetails by event ID
// @access Public

// @route  POST /api/events/restaurant/:cust_id
// @Desc   Customer registeration for events
// @access Private

// @route  GET /api/events/restaurant/:cust_id
// @Desc   get all the events registered by current customer
// @access Private

// @route  GET /api/events/restaurant/:event_id
// @Desc   Customer registeration for events
// @access Private

module.exports = router;