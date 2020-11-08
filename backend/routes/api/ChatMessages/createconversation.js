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

// @route  POST api/chat/conversation/:user_id
// @Desc   create conversation
// @access Private

router.post('/conversation/:user_id', auth, async(req, res) => {
    try {
        let chatMessage = await ChatMessage.find({ $and: [{ userID: req.params.user_id }, { restID: req.restuser.id }] })
            .populate('restuser', ['restName']).populate('user', ['userName']);
        if (chatMessage.length === 0) {
            chatMessage = new ChatMessage({ userID: req.params.user_id, restID: req.restuser.id });
            await chatMessage.save();
        }
        res.json(chatMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/chat/message/:user_id
// @Desc   Restaurant Reply
// @access Private

// router.put('/message/:user_id', auth, async(req, res) => {
//     try {
//         const chatMessage = await ChatMessage.find({ $and: [{ userID: req.params.user_id }, { restID: req.restuser.id }] })
//             .populate('restuser', ['restName']).populate('user', ['userName']);
//         if (chatMessage) {
//             const newMessage = {
//                 from: chatMessage[0].restID,
//                 to: req.params.user_id,
//                 message: req.body.message,
//             };
//             console.log(chatMessage);
//             chatMessage[0].messages.push(newMessage);
//             await chatMessage[0].save();
//             res.json(chatMessage);
//         }
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// @route  PUT api/chat/message/:user_id
// @Desc   User Reply
// @access Private

// router.put('/usermessage/:rest_id', auth, async(req, res) => {
//     try {
//         const chatMessage = await ChatMessage.find({ $and: [{ userID: req.user.id }, { restID: req.params.rest_id }] })
//             .populate('restuser', ['restName']).populate('user', ['userName']);
//         if (chatMessage) {
//             const newMessage = {
//                 from: req.user.id,
//                 to: req.params.rest_id,
//                 message: req.body.message,
//             };
//             console.log(chatMessage);
//             chatMessage[0].messages.push(newMessage);
//             await chatMessage[0].save();
//             res.json(chatMessage);
//         }
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// @route  Get api/chat/
// @Desc   Get all the chat messages
// @access Public

router.get('/', async(req, res) => {
    try {
        const chatMessages = await ChatMessage.find();
        res.json(chatMessages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  Get api/chat/
// @Desc   Get converstaions of logged in restaurent with particular UserId
// @access Private

router.get('/conversation/:user_Id', auth, async(req, res) => {
    try {
        const chatMessages = await ChatMessage.find({ $and: [{ userID: req.params.user_Id }, { restID: req.restuser.id }] });
        if (chatMessages.length === 0) {
            return res.status(400).json({ msg: 'There is no conversation so far' });
        }
        res.json(chatMessages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  Get api/chat/
// @Desc   Get converstaions of logged in user
// @access Private

router.get('/userconversation', auth, async(req, res) => {
    try {
        const chatMessages = await ChatMessage.find({ userID: req.user.id });
        if (chatMessages.length === 0) {
            return res.status(400).json({ msg: 'There is no conversation so far' });
        }
        res.json(chatMessages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/chat/user/:msg_id
// @Desc   Add response to a particular conversation from logged in customer.
// @access Private

router.put('/user/:msg_id', auth, async(req, res) => {
    try {
        console.log("inside create conversation, req is", req)
        const chatMessage = await ChatMessage.find({ _id: req.params.msg_id });
        console.log("chat message was obtained as", chatMessage)
        if (chatMessage.length === 0) {
            return res.status(400).json({ msg: 'There is no conversation so far' });
        }
        console.log("chat message length is ", chatMessage.length)
        const newMessage = {
            from: req.user.id,
            to: chatMessage[0].restID,
            message: req.body.message,
        };
        chatMessage[0].messages.push(newMessage);
        await chatMessage[0].save();
        console.log("chat message save done, chatMessage is", chatMessage)
        res.json(chatMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/chat/user/:msg_id
// @Desc   Add response to a particular conversation from logged in customer.
// @access Private


router.put('/rest/:msg_id', auth, async(req, res) => {
    try {
        const chatMessage = await ChatMessage.find({ _id: req.params.msg_id });
        if (chatMessage.length === 0) {
            return res.status(400).json({ msg: 'There is no conversation so far' });
        }
        const newMessage = {
            from: req.restuser.id,
            to: chatMessage[0].userID,
            message: req.body.message,
        };
        chatMessage[0].messages.push(newMessage);
        await chatMessage[0].save();
        res.json(chatMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// get conversation by converstaion ID

router.get('/:id', auth, async(req, res) => {
    try {
        const chatMessages = await ChatMessage.find({ _id: req.params.id });
        if (!chatMessages) {
            return res.status(400).json({ msg: 'There is no conversation so far' });
        }
        res.json(chatMessages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;