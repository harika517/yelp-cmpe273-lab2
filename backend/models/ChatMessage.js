const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    restID: {
        type: String,
    },
    message: [{
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        message: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
});

const ChatMessage = mongoose.model('chatmessage', ChatMessageSchema);
module.exports = ChatMessage;