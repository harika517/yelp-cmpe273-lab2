const express = require('express');
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../../../middleware/auth');

// const { auth, checkAuth } = require('../../../config/passportjwt');
const User = require('../../../models/User');
// const { secret } = require('../../../config/config');

const router = express.Router();
// auth();

// @route  GET api/auth
// @Desc   Get registered user with token
// @access Private
router.get('/', auth, async(req, res) => {
    try {
        // console.log("/api/auth", req)
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/auth
// @Desc   login route(authenticate user and get token)
// @access Public

router.post(
    '/', [
        check('userEmail', 'Please enter valid email').isEmail(),
        check(
            'password',
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

            userEmail,
            password,

        } = req.body;

        try {
            // see if user exists
            const user = await User.findOne({ userEmail });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcyrpt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const payload = {
                user: {
                    id: user.id,
                    // userName: user.userName,
                    // firstName: user.firstName,
                    // lastName: user.lastName,
                    // userEmail: user.userEmail,
                },
            };
            console.log('User auth login payload', payload);

            jwt.sign(payload, config.get('jwtSecret'), {
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