/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const auth = require('../../../middleware/auth');
const kafka = require('../../../kafka/client');

// @route  GET /api/restaurant/menuitems/:restuser_id
// @Desc   Get all the menu items by restuser_id
// @access Public

// router.get('/menuitems/:restuser_id', async(req, res) => {
//     try {
//         const restprofile = await RestProfile.findOne({ restuser: req.params.restuser_id });

//         // const menuitems = await RestProfile.findOne({ restuser: req.params.restuser_id }).populate('restuser', ['restName']);
//         const menuitems = await restprofile.menuitems;
//         if (menuitems.length === 0) return res.status(400).json({ msg: 'There is no menu created for this restaurant' });
//         res.json(menuitems);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/menuitems/:restuser_id', async(req, res) => {
    const myData = { topic: 'getDishesByRestID', restUserID: req.params.restuser_id };
    console.log('before kafka', req.params.restuser_id);
    kafka.make_request('menuitems', myData, (err, results) => {
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

// @route  PUT /api/restaurant/menuitems
// @Desc   Add Restaurant menuitems
// @access Private

router.put('/menuitems', [auth, [
    check('itemName', 'itemName is required').not().isEmpty(),
    check('itemPrice', 'itemPrice is required').not().isEmpty(),
    check('itemCategory', 'itemCategory is required').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        itemName,
        itemDescription,
        itemIngredients,
        itemPrice,
        itemCategory,
    } = req.body;

    const newMenuItem = {
        itemName,
        itemDescription,
        itemIngredients,
        itemPrice,
        itemCategory,
    };
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        restprofile.menuitems.unshift(newMenuItem);
        await restprofile.save();
        res.json(restprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST /api/restaurant/:menu_id
// @Desc   Update menu items by item_id
// @access Private

router.put('/menuitems/:menu_id', auth, async(req, res) => {
    // build profile object

    const data = {
        'menuitems.$.itemName': req.body.itemName,
        'menuitems.$.itemDescription': req.body.itemDescription,
        'menuitems.$.itemIngredients': req.body.itemIngredients,
        'menuitems.$.itemPrice': req.body.itemPrice,
        'menuitems.$.itemCategory': req.body.itemCategory,
    };
    try {
        console.log('Props', data);
        const restprofile = await RestProfile.findOneAndUpdate({ restuser: req.restuser.id, 'menuitems._id': req.params.menu_id }, { $set: data }, { new: true });
        console.log(restprofile);

        res.json(restprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// router.put('/menuitems/:menu_id', auth, async(req, res) => {
//     console.log("Current Rest", req.restuser.id);
//     const myData = {
//         topic: 'editMenuItem',
//         restUserID: req.restuser.id,
//         menuID: req.params.menu_id,
//         itemName: req.body.itemName,
//         itemDescription: req.body.itemDescription,
//         itemIngredients: req.body.itemIngredients,
//         itemPrice: req.body.itemPrice,
//         itemCategory: req.body.itemCategory,
//     };
//     console.log('before kafka', req.restuser.id);
//     kafka.make_request('menuitems', myData, (err, results) => {
//         console.log('in result');
//         console.log(results.message);
//         if (err) {
//             console.log('Inside err');
//             res.status(500).send('System Error, Try Again.');
//         } else {
//             console.log('Inside else');
//             res.status(200).json(results.message);
//             res.end();
//         }
//     });
// });

// @route  GET /api/restaurant/menuitems
// @Desc   Get all the current restaurant profile's menu items
// @access Private

// router.get('/menuitems', auth, async(req, res) => {
//     try {
//         const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
//         const menuitems = await restprofile.menuitems;
//         if (menuitems.length === 0) return res.status(400).json({ msg: 'There is no menu created for this restaurant' });
//         res.json(menuitems);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/menuitems', auth, async(req, res) => {
    const myData = { topic: 'getCurrentRestDishes', restUserID: req.restuser.id };
    console.log('before kafka', req.restuser.id);
    kafka.make_request('menuitems', myData, (err, results) => {
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

// @route  GET /api/restaurant/menuitems/:menu_id
// @Desc   Get menuitem by id
// @access Private

// router.get('/menuitems/itemdetail/:menu_id', auth, async(req, res) => {
//     try {
//         const restprofile = await RestProfile.findOne({
//             $and: [{ restuser: req.restuser.id },
//                 { 'menuitems._id': req.params.menu_id }
//             ],
//         });

//         const itemIndex = restprofile.menuitems.map((item) => item.id).indexOf(req.params.menu_id);
//         const menuitem = await restprofile.menuitems[itemIndex];
//         if (!restprofile) return res.status(400).json({ msg: 'There is no menu created with this ID' });
//         res.json(menuitem);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/menuitems/itemdetail/:menu_id', auth, async(req, res) => {
    const myData = { topic: 'getMenuItemDetail', menuitemID: req.params.menu_id, restUserID: req.restuser.id };
    console.log('before kafka', req.params.menu_id);
    kafka.make_request('menuitems', myData, (err, menuitem) => {
        console.log('in result');
        console.log(menuitem.message);
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            console.log('Inside else');
            res.status(200).json(menuitem.message);
            res.end();
        }
    });
});
module.exports = router;