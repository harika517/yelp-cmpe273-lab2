const UserProfile = require('../../../models/UserProfile');
const User = require('../../../models/User');

const res = {}

const handle_request = async(myData, callback) => {
    // const { topic } = body;
    const topic = myData.topic;
    console.log("In topic", topic)
    switch (topic) {
        case 'allUsers':
            return allUsers(myData, callback);
        case 'allOtherUsers':
            return allOtherUsers(myData, callback);
        case 'getCurrentUserProfile':
            return getCurrentUserProfile(myData, callback);
        case 'getProfileById':
            return getProfileById(myData, callback);
    }
}

async function allUsers(myData, callback) {
    try {
        let results = await UserProfile.find().select('-password');
        if (!results) {
            res.status = 400;
            res.message = "No Customers in DB";
            return callback(null, rresultses);
        }
        res.status = 200
        res.message = results
        return callback(null, results);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, results);
    }
}

async function allOtherUsers(myData, callback) {
    // const checkObjId = new ObjectId(body.user.id);
    const customerId = myData.customerId
    console.log("before try", customerId)
    try {
        console.log("Inside try")
        let customers = await UserProfile.find().populate('user', ['userName', 'image', 'firstName', 'lastName', 'userEmail']);
        console.log("Inside all other users", customers)
        const results = customers.filter((prof) => (!prof.user._id.equals(customerId)));
        console.log("Inside results", results)
        if (!results) {
            res.status = 400;
            res.message = "No Other Customers in DB";
            return callback(null, res);
        }
        res.status = 200
        res.message = results
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

async function getCurrentUserProfile(myData, callback) {
    // const checkObjId = new ObjectId(body.user.id);
    const userID = myData.userID
    console.log("before try", userID)
    try {
        console.log("Inside try")
        let results = await UserProfile.findOne({ user: userID }).populate('user', ['userName', 'image', 'userEmail', 'firstName']);
        console.log("Inside all other users", results)
        console.log("Inside results", results)
        if (!results) {
            res.status = 400;
            res.message = "No profile for this user";
            return callback(null, res);
        }
        res.status = 200
        res.message = results
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

async function getProfileById(myData, callback) {
    // const checkObjId = new ObjectId(body.user.id);
    const userID = myData.userID
    console.log("before try", userID)
    try {
        console.log("Inside try")
        let results = await UserProfile.findOne({ user: userID }).populate('user', ['userName', 'userEmail', 'firstName', 'lastName', 'image']);
        console.log("Inside all other users", results)
        console.log("Inside results", results)
        if (!results) {
            res.status = 400;
            res.message = "No profile for this user";
            return callback(null, res);
        }
        res.status = 200
        res.message = results
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

exports.handle_request = handle_request;