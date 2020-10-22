const mongoose = require('mongoose');

const SocialEventsSchema = new mongoose.Schema({
    restuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restuser',
    },
    eventName: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventTimings: {
        type: String,
        required: true,
    },
    eventDate: {
        type: String,
    },
    eventLocation: {
        type: String,
        required: true,
    },
    eventHashtags: {
        type: String,
    },
    eventAttendees: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        userName: {
            type: String,
        },
        userEmail: {
            type: String,
        },
        image: {
            type: String,
        },
    }],
});

const SocialEvent = mongoose.model('socialevent', SocialEventsSchema);
module.exports = SocialEvent;