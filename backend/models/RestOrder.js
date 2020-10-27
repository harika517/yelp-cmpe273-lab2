const mongoose = require('mongoose');

const RestOrderSchema = new mongoose.Schema({
    restuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restuser',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    menuitems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restprofile',
    },
    Quantiy: {
        type: Number,
        required: true,
    },
    deliveryMethod: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const RestOrder = mongoose.model('restorder', RestOrderSchema);
module.exports = RestOrder;