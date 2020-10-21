const mongoose = require('mongoose');

const RestProfileSchema = new mongoose.Schema({
    restuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restuser',
    },
    description: {
        type: String,
    },
    contact: {
        type: String,
        required: true,
    },
    timings: {
        type: String,
    },
    cuisine: {
        type: String,
    },
    DineIn: {
        type: String,
    },
    curbSidePickUp: {
        type: String,
    },
    yelpDelivery: {
        type: String,
    },
    restimages: [String],
});

const RestProfile = mongoose.model('restprofile', RestProfileSchema);
module.exports = RestProfile;