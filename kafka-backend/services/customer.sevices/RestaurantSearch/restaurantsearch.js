const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');

const res = {}

const handle_request = async(myData, callback) => {
    // const { topic } = body;
    const topic = myData.topic;
    console.log("In topic", topic)
    switch (topic) {
        case 'allRestaurants':
            return allRestaurants(myData, callback);
        case 'allRestaurantsDineIn':
            return allRestaurantsDineIn(myData, callback);
        case 'allRestaurantsCurbSide':
            return allRestaurantsCurbSide(myData, callback);
        case 'allRestaurantsYelpDelivery':
            return allRestaurantsYelpDelivery(myData, callback);
        case 'allRestaurantsSearchCriteria':
            return allRestaurantsSearchCriteria(myData, callback);
    }
}

async function allRestaurants(myData, callback) {
    try {
        const results = await RestProfile.find().populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
        if (!results) {
            res.status = 400;
            res.message = "No Restaurants in DB with this criteria";
            return callback(null, results);
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

async function allRestaurantsDineIn(myData, callback) {
    try {
        const results = await RestProfile.find({ DineIn: 'yes' }).populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
        if (!results) {
            res.status = 400;
            res.message = "No Restaurants in DB with this criteria";
            return callback(null, results);
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

async function allRestaurantsCurbSide(myData, callback) {
    try {
        const results = await RestProfile.find({ curbSidePickUp: 'yes' }).populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
        if (!results) {
            res.status = 400;
            res.message = "No Restaurants in DB with this criteria";
            return callback(null, results);
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

async function allRestaurantsYelpDelivery(myData, callback) {
    try {
        const results = await RestProfile.find({ yelpDelivery: 'yes' }).populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
        if (!results) {
            res.status = 400;
            res.message = "No Restaurants in DB with this criteria";
            return callback(null, results);
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

async function allRestaurantsSearchCriteria(myData, callback) {
    const searchWord = myData.searchWord
    try {
        const restuser = await RestUser.find({
            $or: [
                { restName: { $regex: `.*${searchWord}.*` } },
                { location: { $regex: `.*${searchWord}.*` } },
            ],
        });
        const restprofile = await RestProfile.find({
            $or: [
                { cuisine: { $regex: `.*${searchWord}.*` } },
                { menuitems: { $elemMatch: { itemName: { $regex: `.*${searchWord}.*` } } } },
            ],
        }).populate('restuser', ['restEmail', 'restName', 'location', 'image', 'lat', 'lng']);
        const results = [...restuser, ...restprofile];
        // const results = await RestProfile.find({ yelpDelivery: 'yes' }).populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
        if (!results) {
            res.status = 400;
            res.message = "No Restaurants in DB with this criteria";
            return callback(null, results);
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