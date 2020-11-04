const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    contact: {
        type: String,
    },
    headline: {
        type: String,
    },
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
    },
    yelpingSince: {
        type: String,
    },
    thingsILove: {
        type: String,
    },
    findmein: {
        type: String,
    },
    myBlog: {
        type: String,
    },
    following: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        userId: {
            type: String,
            unique: true,
        },
    }],
    // followers: [{
    //     userId: {
    //         type: String,
    //         unique: true,
    //     },
    // }],

    // userName: {
    //     type: String,
    // },
    // firstName: {
    //     type: String,
    // },
    // lastName: {
    //     type: String,
    // },
    // userEmail: {
    //     type: String,
    // },

});

const UserProfile = mongoose.model('userprofile', UserProfileSchema);
module.exports = UserProfile;