/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const auth = require('../../../middleware/auth');

// @route  GET /api/restaurant/menuitems/:restuser_id
// @Desc   Get all the menu items by restuser_id
// @access Public

router.get('/menuitems/:restuser_id', async(req, res) => {
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.params.restuser_id });

        // const menuitems = await RestProfile.findOne({ restuser: req.params.restuser_id }).populate('restuser', ['restName']);
        const menuitems = await restprofile.menuitems;
        if (menuitems.length === 0) return res.status(400).json({ msg: 'There is no menu created for this restaurant' });
        res.json(menuitems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
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

// under construction
router.put('/menuitems/:menu_id', auth, async(req, res) => {
    // build profile object
    const {
        itemName,
        itemDescription,
        itemIngredients,
        itemPrice,
        itemCategory,
    } = req.body;
    const restMenuItemFields = {};
    if (itemName) restMenuItemFields.itemName = itemName;
    if (itemDescription) restMenuItemFields.itemDescription = itemDescription;
    if (itemIngredients) restMenuItemFields.itemIngredients = itemIngredients;
    if (itemPrice) restMenuItemFields.itemPrice = itemPrice;
    if (itemCategory) restMenuItemFields.itemCategory = itemCategory;
    try {
        let restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        console.log(restprofile);
        // Get index of menu item to be updated

        const itemIndex = restprofile.menuitems.map((item) => item.id).indexOf(req.params.menu_id);
        console.log(itemIndex);

        if (restprofile) {
            restprofile = await RestProfile.findOneAndUpdate({ menuitem: restprofile.menuitems[itemIndex] }, { $set: restMenuItemFields }, { new: true });
        }
        await restprofile.save()
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/restaurant/menuitems
// @Desc   Get all the current restaurant profile's menu items
// @access Private

router.get('/menuitems', auth, async(req, res) => {
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        const menuitems = await restprofile.menuitems;
        if (menuitems.length === 0) return res.status(400).json({ msg: 'There is no menu created for this restaurant' });
        res.json(menuitems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/restaurant/menuitems/:menu_id
// @Desc   Get menuitem by id
// @access Private

router.get('/menuitems/itemdetail/:menu_id', auth, async(req, res) => {
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        const itemIndex = restprofile.menuitems.map((item) => item.id).indexOf(req.params.menu_id);
        const menuitems = await restprofile.menuitems[itemIndex];
        if (!menuitems) return res.status(400).json({ msg: 'There is no menu created for this restaurant' });
        res.json(menuitems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;