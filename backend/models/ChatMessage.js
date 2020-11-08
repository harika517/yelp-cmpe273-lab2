const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    restuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restuser',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    restID: {
        type: String,
    },
    userID: {
        type: String,
    },
    messages: [{
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