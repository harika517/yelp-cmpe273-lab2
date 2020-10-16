const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    contact: {
        type: String,
    },
    headline: {
        type: String,
    },
    basicdetails: [{
        dateOfBirth: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        nickName: {
            type: String,
        }

    }],
    about: [{
        yelpingSince: {
            type: String,
        },
        thingsILove: {
            type: [String],
        },
        findmein: {
            type: String,
        },
        myBlog: {
            type: String,
        },
    }],
});

const UserProfile = mongoose.model('userprofile', UserProfileSchema);
module.exports = UserProfile;