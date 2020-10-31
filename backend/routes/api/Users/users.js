/* eslint-disable no-console */
// registering and adding users
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
const bcyrpt = require('bcryptjs');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
// const { secret } = require('../../../config/config');
const User = require('../../../models/User');
// const { auth } = require('../../../config/passportjwt');

// @route  POST api/users
// @Desc   Resgister User
// @access Public
router.post(
    '/', [
        check('userName', 'Name is required').not().isEmpty(),
        check('userEmail', 'Please enter valid email').isEmail(),
        check(
            'password',
            'Please enter password with 6 or more characters',
        ).isLength({ min: 6 }),
    ],
    async(req, res) => {
        // console.log('inside api/users')
        const errors = validationResult(req);
        // console.log('api/users', req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            userName,
            userEmail,
            password,
            firstName,
            lastName,
        } = req.body;

        try {
            // see if user exists
            let user = await User.findOne({ userEmail });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
            }
            // get users gravatar
            const image = gravatar.url(userEmail, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            user = new User({
                userName,
                userEmail,
                password,
                firstName,
                lastName,
                image,
            });
            // Encrypt password
            const salt = await bcyrpt.genSalt(10);
            user.password = await bcyrpt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id,
                    // userName: user.userName,
                    // firstName: user.firstName,
                    // lastName: user.lastName,
                    // userEmail: user.userEmail,
                },
            };

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