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
    date: {
        type: Date,
        default: Date.now,
    },
});

const RestUser = mongoose.model('restUser', RestUserSchema);
module.exports = RestUser;