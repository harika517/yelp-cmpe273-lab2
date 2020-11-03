const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userprofile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userprofile',
    },
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;