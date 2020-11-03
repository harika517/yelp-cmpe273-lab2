/* eslint-disable consistent-return */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');
const User = require('../models/User');
const RestUser = require('../models/RestUser');

// Setup work and export for the JWT passport strategy
function auth() {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: secret,
    };
    passport.use(
        // eslint-disable-next-line camelcase
        new JwtStrategy(opts, (jwt_payload, callback) => {
            // eslint-disable-next-line no-underscore-dangle
            const userId = jwt_payload._id;
            console.log('Inside passportjwt:auth()', userId);
            User.findById(userId, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                } else {
                    callback(null, false);
                }
            });
        }),
    );
}

function checkAuth(req, res, next) {
    // Get the token
    const token = req.header('x-auth-token');
    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorization denied' });
    }

    try {
        passport.authenticate('jwt', { session: false });
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        console.log('checkAuth', req.user);
        next();
    } catch (err) {
        res.status(401).json({ msg: ' Token is not valid' });
    }
}

function restauth() {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: secret,
    };
    passport.use(
        // eslint-disable-next-line camelcase
        new JwtStrategy(opts, (jwt_payload, callback) => {
            // eslint-disable-next-line no-underscore-dangle
            const restuserId = jwt_payload._id;
            RestUser.findById(restuserId, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                } else {
                    callback(null, false);
                }
            });
        }),
    );
}

function restcheckAuth(req, res, next) {
    // Get the token
    const token = req.header('x-auth-token');
    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorization denied' });
    }

    try {
        passport.authenticate('jwt', { session: false });
        const decoded = jwt.verify(token, secret);
        req.restuser = decoded.restuser;
        next();
    } catch (err) {
        res.status(401).json({ msg: ' Token is not valid' });
    }
}

exports.auth = auth;
exports.checkAuth = checkAuth;
exports.restauth = restauth;
exports.restcheckAuth = restcheckAuth;