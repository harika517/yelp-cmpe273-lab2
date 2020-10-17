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
    restimages: [String],
    dishimages: [String],
    menuItems: [{
        itemName: {
            type: String,
            required: true,
        },
        itemDescription: {
            type: String,
        },
        itemIngredients: {
            type: String,
        },
        itemPrice: {
            type: String,
            required: true,
        },
        itemCategory: {
            type: String,
            required: true,
        },
        itemImage: {
            type: String,
        },

    }],
});

const RestProfile = mongoose.model('restprofile', RestProfileSchema);
module.exports = RestProfile;