/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const kafka = require('../../../kafka/client');

// @route  GET api/search/searchrestaurants
// @Desc   get all the restaurants
// @access Public

// router.get('/searchrestaurants', async(req, res) => {
//     try {
//         const profiles = await RestProfile.find().populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
//         res.json(profiles);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/searchrestaurants', async(req, res) => {
    const myData = { topic: 'allRestaurants' };
    kafka.make_request('restaurantsearch', myData, (err, results) => {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            console.log('Inside else');
            res.status(200).json(results);

            res.end();
        }
    });
});
// @route  GET api/search/restaurants/dinein
// @Desc   get Restaurants whose DineIn is yes
// @access Public

// router.get('/restaurants/dinein', async(req, res) => {
//     try {
//         const restuser = await RestProfile.find({ DineIn: 'yes' }).populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
//         if (restuser.length === 0) {
//             return res.status(400).json({ msg: 'There are no restaurants' });
//         }
//         res.json(restuser);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/restaurants/dinein', async(req, res) => {
    const myData = { topic: 'allRestaurantsDineIn' };
    kafka.make_request('restaurantsearch', myData, (err, results) => {
        console.log('in result');
        console.log(results.message);
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            console.log('Inside else');
            res.status(200).json(results.message);

            res.end();
        }
    });
});
// @route  GET api/search/restaurants/curbside
// @Desc   get Restaurants whose curbside is yes
// @access Public

// router.get('/restaurants/curbside', async(req, res) => {
//     try {
//         const restuser = await RestProfile.find({ curbSidePickUp: 'yes' }).populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
//         if (restuser.length === 0) {
//             return res.status(400).json({ msg: 'There are no restaurants' });
//         }
//         res.json(restuser);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/restaurants/curbside', async(req, res) => {
    const myData = { topic: 'allRestaurantsCurbSide' };
    kafka.make_request('restaurantsearch', myData, (err, results) => {
        console.log('in result');
        console.log(results.message);
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            console.log('Inside else');
            res.status(200).json(results.message);

            res.end();
        }
    });
});

// @route  GET api/search/restaurants/yelpdelivery
// @Desc   get Restaurants whose yelpdelivery is yes
// @access Public

// router.get('/restaurants/yelpdelivery', async(req, res) => {
//     try {
//         const restuser = await RestProfile.find({ yelpDelivery: 'yes' }).populate('restuser', ['restName', 'location', 'image', 'lat', 'lng']);
//         if (restuser.length === 0) {
//             return res.status(400).json({ msg: 'There are no restaurants' });
//         }
//         res.json(restuser);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/restaurants/yelpdelivery', async(req, res) => {
    const myData = { topic: 'allRestaurantsYelpDelivery' };
    kafka.make_request('restaurantsearch', myData, (err, results) => {
        console.log('in result');
        console.log(results.message);
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            console.log('Inside else');
            res.status(200).json(results.message);

            res.end();
        }
    });
});

// @route  GET api/restprofile/restaurants/criteria/:word
// @Desc   get Restaurants by serach criteria names, cuisines, location
// @access Public

router.get('/restaurants/criteria/:word', async(req, res) => {
    try {
        const restuser = await RestUser.find({
            $or: [
                { restName: { $regex: `.*${req.params.word}.*` } },
                { location: { $regex: `.*${req.params.word}.*` } },
            ],
        });
        const restprofile = await RestProfile.find({
            $or: [
                { cuisine: { $regex: `.*${req.params.word}.*` } },
                { menuitems: { $elemMatch: { itemName: { $regex: `.*${req.params.word}.*` } } } },
            ],
        }).populate('restuser', ['restEmail', 'restName', 'location', 'image', 'lat', 'lng']);
        const results = [...restuser, ...restprofile];
        if (results.length === 0) {
            return res.status(400).json({ msg: 'There are no restaurants' });
        }
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/restaurants/criteria/:word', async(req, res) => {
    const myData = { topic: 'allRestaurantsSearchCriteria', searchWord: req.params.word };
    kafka.make_request('restaurantsearch', myData, (err, results) => {
        console.log('in result');
        console.log(results.message);
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            console.log('Inside else');
            res.status(200).json(results.message);

            res.end();
        }
    });
});

module.exports = router;