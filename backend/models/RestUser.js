const mongoose = require('mongoose');

const RestUserSchema = new mongoose.Schema({
    restName: {
        type: String,
        required: true,
    },
    restEmail: {
        type: String,
        required: true,
        unique: true,
    },
    restpassword: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const RestUser = mongoose.model('restuser', RestUserSchema);
module.exports = RestUser;