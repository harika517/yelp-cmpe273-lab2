const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const SocialEvent = require('../../../models/SocialEvents');
const User = require('../../../models/User');

const res = {}

const handle_request = async(myData, callback) => {
    // const { topic } = body;
    const topic = myData.topic;
    console.log("In topic", topic)
    switch (topic) {
        case 'getAllEvents':
            return getAllEvents(myData, callback);
        case 'getEventDetail':
            return getEventDetail(myData, callback);
        case 'eventRegistration':
            return eventRegistration(myData, callback);
        case 'getResgisteredEvents':
            return getResgisteredEvents(myData, callback);
        case 'getCustomersRegistered':
            return getCustomersRegistered(myData, callback);
        case 'getSearchEvent':
            return getSearchEvent(myData, callback);
        case 'getRestaurantEvents':
            return getRestaurantEvents(myData, callback);
    }
}

async function getAllEvents(myData, callback) {
    try {
        let events = await SocialEvent.find().populate('restuser', ['restName', 'location']).sort({ eventDate: 1 });
        if (!events) {
            res.status = 400;
            res.message = "No Customers in DB";
            return callback(null, events);
        }
        res.status = 200
        res.message = events
        return callback(null, events);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, events);
    }
}

async function getEventDetail(myData, callback) {
    const eventID = myData.eventID
    try {
        console.log("Inside try")
        const results = await SocialEvent.find({ _id: eventID }).populate('restuser', ['restName', 'location']);
        console.log("Inside all other users", results)
            // const results = customers.filter((prof) => (!prof.user._id.equals(customerId)));
        console.log("Inside results", results)
        if (!results) {
            res.status = 400;
            res.message = "No Event Detail";
            return callback(null, res);
        }
        res.status = 200
        res.message = results
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

async function eventRegistration(myData, callback) {
    const eventID = myData.eventID
    const userID = myData.userID
    try {
        console.log("Inside try")
        const user = await User.findById(userID).select('-password');
        const socialevent = await SocialEvent.findById(eventID);
        const neweventAttendee = {
            user: userID,
            userName: user.userName,
            userEmail: user.userEmail,
            image: user.image,
        };

        socialevent.eventAttendees.unshift(neweventAttendee);
        await socialevent.save();
        res.json(socialevent);
        // console.log("Inside all other users", results)
        // const results = customers.filter((prof) => (!prof.user._id.equals(customerId)));
        console.log("Inside results", socialevent)
        if (!socialevent) {
            res.status = 400;
            res.message = "No Event Detail";
            return callback(null, res);
        }
        res.status = 200
        res.message = socialevent
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

async function getResgisteredEvents(myData, callback) {
    const userID = myData.userID
    try {
        console.log("Inside try")
        let results = await SocialEvent.find({ 'eventAttendees.user': userID });
        if (!results) {
            return res.status(400).json({ msg: 'You have not registered for any event' });
        }
        console.log("Kafka Backend", results);
        results = results.map((_i) => ({
            eventName: _i.eventName,
            eventDescription: _i.eventDescription,
            eventTimings: _i.eventTimings,
            eventDate: _i.eventDate,
            eventLocation: _i.eventLocation,
        }));
        console.log("Inside results", results)
        if (!results) {
            res.status = 400;
            res.message = "No Event Detail";
            return callback(null, res);
        }
        res.status = 200
        res.message = results
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}


async function getCustomersRegistered(myData, callback) {
    const eventID = myData.eventID
    try {
        console.log("Inside try")
        const socialevent = await SocialEvent.findById(eventID);
        console.log("spcial event", socialevent)
        const results = await socialevent.eventAttendees;
        if (results.length === 0) return res.status(400).json({ msg: 'No attendees for this event yet' });
        console.log("Inside results", results)

        if (!results) {
            res.status = 400;
            res.message = "No Event Detail";
            return callback(null, res);
        }
        res.status = 200
        res.message = results
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

async function getSearchEvent(myData, callback) {
    const searchWord = myData.searchWord
    try {
        console.log("Inside Try getSearchEvent")
        const events = await SocialEvent.find({ eventName: { $regex: `.*${searchWord}.*` } });
        console.log(events)
        if (events.length === 0) {
            res.status = 400;
            res.message = "No Customers in DB";
            return callback(null, res);
        }
        res.status = 200
        res.message = events
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

async function getRestaurantEvents(myData, callback) {
    const restUserID = myData.restUserID
    try {
        console.log("Inside Try getSearchEvent")
        const events = await SocialEvent.find({ restuser: restUserID }).populate('restuser', ['restName', 'location']);
        console.log(events)
        if (events.length === 0) {
            res.status = 400;
            res.message = "No Customers in DB";
            return callback(null, res);
        }
        res.status = 200
        res.message = events
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

exports.handle_request = handle_request;