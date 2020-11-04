/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const { ObjectId } = require('mongodb');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const SocialEvent = require('../../../models/SocialEvents');
const User = require('../../../models/User');
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
        const events = await SocialEvent.find().populate('restuser', ['restName', 'location']).sort({ eventDate: 1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/events/:socialevent_id
// @Desc   Get Eventdetails by event ID
// @access Public

router.get('/:socialevent_id', async(req, res) => {
    const objId = new ObjectId(req.params.socialevent_id);
    try {
        const event = await SocialEvent.find({ _id: objId }).populate('restuser', ['restName', 'location']);
        if (!event) return res.status(400).json({ msg: 'There is no profile for this user' });
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST /api/events/user/:user_id
// @Desc   Customer registeration for events
// @access Private

router.put('/user/:event_id', auth, async(req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const socialevent = await SocialEvent.findById(req.params.event_id);
        const neweventAttendee = {
            user: req.user.id,
            userName: user.userName,
            userEmail: user.userEmail,
            image: user.image,
        };

        socialevent.eventAttendees.unshift(neweventAttendee);
        await socialevent.save();
        res.json(socialevent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/events/user/me
// @Desc   get all the events registered by current customer
// @access Private

router.get('/user/me', auth, async(req, res) => {
    const objId = new ObjectId(req.user.id);
    try {
        const socialevent = await SocialEvent.find({ 'eventAttendees.user': objId });
        if (!socialevent) {
            return res.status(400).json({ msg: 'You have not registered for any event' });
        }
        console.log(socialevent);
        const var1 = socialevent.map((_i) => ({
            eventName: _i.eventName,
            eventDescription: _i.eventDescription,
            eventTimings: _i.eventTimings,
            eventDate: _i.eventDate,
            eventLocation: _i.eventLocation,
        }));
        console.log('var1 is ', var1);
        res.json(var1);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /api/events/restaurant/:event_id
// @Desc   get all the customers registered for an event
// @access Private

router.get('/restaurant/:event_id', auth, async(req, res) => {
    try {
        const socialevent = await SocialEvent.findById(req.params.event_id);

        // const menuitems = await RestProfile.findOne({ restuser: req.params.restuser_id }).populate('restuser', ['restName']);
        const eventAttendees = await socialevent.eventAttendees;
        if (eventAttendees.length === 0) return res.status(400).json({ msg: 'No attendees for this event yet' });
        res.json(eventAttendees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// search event by any word

// @route  GET /api/events/searchevent/:word
// @Desc   get all the customers registered for an event
// @access Public

router.get('/searchevent/:word', async(req, res) => {
    try {
        const searchword = req.params.word;
        const event = await SocialEvent.find({ eventName: { $regex: `.*${searchword}.*` } });

        if (event.length === 0) {
            return res.status(400).json({ msg: 'There are no events with this name' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// search event by any word

// @route  GET /api/events/restaurant/me
// @Desc   get all the events created by current restaurant
// @access Public

router.get('/restaurantevents', auth, async(req, res) => {
    // console.log("events created by restaurant", req.restuser.id)
    // const objId = new ObjectId(req.restuser.id);

    try {
        const event = await SocialEvent.find({ restuser: req.restuser.id }).populate('restuser', ['restName', 'location']);
        if (!event) return res.status(400).json({ msg: 'There are no events created by this Restaurant' });
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;