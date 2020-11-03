const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    // console.log("auth token was called")
    // check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, Autherization denied' });
    }
    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        if (decoded.user) {
            req.user = decoded.user;
            // console.log("middlewareauth req.user", req.user);
        }
        if (decoded.restuser) {
            req.restuser = decoded.restuser;
            // console.log("middlewareauth req.restuser", req.restuser);
        }

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};