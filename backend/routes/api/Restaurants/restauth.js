const express = require('express');
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { auth, checkAuth } = require('../../../config/passportjwt');
const RestUser = require('./models/RestUser');
const { secret } = require('../../../config/config');

const router = express.Router();
auth();

// @route  GET /api/restauth
// @Desc   Get registered restuser with token
// @access Private
router.get('/', checkAuth, async(req, res) => {
    try {
        const restuser = await RestUser.findById(req.user.id).select('-password');
        res.json(restuser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST /api/restauth
// @Desc   login route(authenticate rest user and get token)
// @access Public

router.post(
    '/', [
        check('restEmail', 'Please enter valid email').isEmail(),
        check(
            'restpassword',
            'Password is required',
        ).exists(),
    ],
    // eslint-disable-next-line consistent-return
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {

            restEmail,
            restpassword,

        } = req.body;

        try {
            // see if user exists
            const restuser = await RestUser.findOne({ restEmail });
            if (!restuser) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcyrpt.compare(restpassword, restuser.restpassword);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const payload = {
                user: { id: restuser.id },
            };

            jwt.sign(payload, secret, {
                expiresIn: 1008000,
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        // console.log(req.body);
    },
);

module.exports = router;