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
const RestUser = require('../../../models/RestUser');
// const { auth } = require('../../../config/passportjwt');

// @route  POST /api/restusers
// @Desc   Resgister User
// @access Public
router.post(
    '/', [
        check('restName', 'Name is required').not().isEmpty(),
        check('restEmail', 'Please enter valid email').isEmail(),
        check(
            'restpassword',
            'Please enter password with 6 or more characters',
        ).isLength({ min: 6 }),
        check('location', 'location is required').not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            restName,
            restEmail,
            restpassword,
            location
        } = req.body;

        try {
            // see if user exists
            let restuser = await RestUser.findOne({ restEmail });
            if (restuser) {
                return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
            }
            // get users gravatar
            const image = gravatar.url(restEmail, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            restuser = new RestUser({
                restName,
                restEmail,
                restpassword,
                location,
                image,
            });
            // Encrypt password
            const salt = await bcyrpt.genSalt(10);
            restuser.restpassword = await bcyrpt.hash(restpassword, salt);
            await restuser.save();

            const payload = {
                restuser: { id: restuser.id },
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