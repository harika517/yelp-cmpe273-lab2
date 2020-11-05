/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const { ObjectId } = require('mongodb');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const RestOrder = require('../../../models/RestOrder');
const User = require('../../../models/User');
const UserProfile = require('../../../models/UserProfile');
const ChatMessage = require('../../../models/ChatMessage');
const auth = require('../../../middleware/auth');

// @route  POST api/chat/converstaion/:user_id
// @Desc   create conversation
// @access Private

router.post('/conversation/:user_id', auth, async(req, res) => {
    try {
        const chatMessage = new ChatMessage({ userID: req.params.user_id, restID: req.restuser.id });
        await chatMessage.save();
        res.json(chatMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/chat/message/:user_id
// @Desc   find userID and restID and initiate message from restaurant to user
// @access Private

router.put('/message/:user_id', auth, async(req, res) => {
    const {
        message,
    } = req.body;
    const from = req.restuser.id;
    const to = req.params.user_id;

    const newMessage = {
        message,
        from,
        to,
    };

    console.log("new message", newMessage)
    try {
        const chatmessage = await ChatMessage.find({ $and: [{ userID: req.params.user_id }, { restID: req.restuser.id }] });
        console.log(chatmessage)
        chatmessage.message.unshift(newMessage);
        await chatmessage.save();
        res.json(chatmessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;