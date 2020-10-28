/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const RestUser = require('../../../models/RestUser');
const { ObjectId } = require('mongodb');
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
router.post('/:menu_id', auth, async(req, res) => {
    // build profile object
    const {
        itemName,
        itemDescription,
        itemIngredients,
        itemPrice,
        itemCategory,
    } = req.body;
    const restMenuItemFields = {};
    restMenuItemFields.restuser = req.restuser.id;
    if (itemName) restMenuItemFields.itemName = itemName;
    if (itemDescription) restMenuItemFields.itemDescription = itemDescription;
    if (itemIngredients) restMenuItemFields.itemIngredients = itemIngredients;
    if (itemPrice) restMenuItemFields.itemPrice = itemPrice;
    if (itemCategory) restMenuItemFields.itemCategory = itemCategory;
    try {
        console.log(req.params.id)
        const objId = ObjectId(req.params.id);
        console.log("req params id", objId)


        const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        const menuitem = await RestProfile.find({ _id: objId })
            // console.log("menuitem update", restprofile.menuitems)
            // console.log("req user id", req.restuser.id)
            // console.log("req.params.menu_id", req.params.menu_id)
            //     //const outpu = RestProfile.findOne({ restuser: req.restuser.id, "menuitems._id": req.params.menu_id });
            // console.log("rest profile find one of menu_id", outpu)

        // find index of the menu item to update
        // const itemIndex = restprofile.menuitems.map((item) => item.id).indexOf(req.params.menu_id);
        // console.log("update menu item", itemIndex)

        // if (restprofile) {
        //     // update
        //     RestProfile.findOneAndUpdate({ "menuitems.itemName": "Banana Leaf Rice- Nasi Lemak" }, { $update: { "menuitems.$.itemPrice": "16.95" } }, { new: true });
        //     const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });
        //     return res.json(restprofile);
        // }
        // await restprofile.save();
        // res.json(restprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/restaurant/menuitems
// @Desc   Get all the current profile's menu items
// @access Private

router.get('/menuitems', auth, async(req, res) => {
    try {
        const restprofile = await RestProfile.findOne({ restuser: req.restuser.id });

        // const menuitems = await RestProfile.findOne({ restuser: req.params.restuser_id }).populate('restuser', ['restName']);
        const menuitems = await restprofile.menuitems;
        if (menuitems.length === 0) return res.status(400).json({ msg: 'There is no menu created for this restaurant' });
        res.json(menuitems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;