/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const { ObjectId } = require('mongodb');
const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');
const RestOrder = require('../../../models/RestOrder');
const User = require('../../../models/User');
const UserProfile = require('../../../models/UserProfile');
const auth = require('../../../middleware/auth');

// @route  POST /api/orders/create/:restuser_id/:menuitems_id
// @Desc   Create orders by customers
// @access Private
router.post('/create/:restuser_id/:menuitems_id', [auth, [
    check('Quantiy', 'Quantiy is required').not().isEmpty(),
    check('deliveryMethod', 'deliveryMethod is required').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        Quantiy,
        deliveryMethod,
    } = req.body;
    const restOrderFields = {};
    restOrderFields.userId = req.user.id;
    restOrderFields.restId = req.params.restuser_id;
    restOrderFields.menuId = req.params.menuitems_id;
    restOrderFields.orderStatus = 'New_Order';
    if (Quantiy) restOrderFields.Quantiy = Quantiy;
    if (deliveryMethod) restOrderFields.deliveryMethod = deliveryMethod;

    try {
        let restorder = await RestOrder.find({
            restuser: req.params.restuser_id,
            menuitems: req.params.menuitems_id,
        });

        restorder = new RestOrder(restOrderFields);
        await restorder.save();
        res.json(restorder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/orders/me
// @Desc   Get all the orders created by currently logged in user
// @access Private

router.get('/me', auth, async(req, res) => {
    try {
        const restorder = await RestOrder.find({ userId: req.user.id });
        if (restorder.length === 0) return res.status(400).json({ msg: 'No orders placed so far' });
        res.json(restorder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/orders/me/:orderStatus
// @Desc   filter all the orders created by currently logged in user by order_status
// @access Private

router.get('/me/:orderStatus', auth, async(req, res) => {
    try {
        const restorder = await RestOrder.find({
            $and: [{ orderStatus: req.params.orderStatus }, { userId: req.user.id }],
        }, );
        if (restorder.length === 0) return res.status(400).json({ msg: 'No orders with this status' });
        res.json(restorder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Restaurant Side

// @route  GET /api/orders/restaurant
// @Desc   View all the orders made to the currently logged in restaurant
// @access Private

router.get('/restaurant', auth, async(req, res) => {
    try {
        const restorder = await RestOrder.find({ restId: req.restuser.id });
        if (restorder.length === 0) return res.status(400).json({ msg: 'No orders placed so far' });
        res.json(restorder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route  POST /api/orders/restaurant/updateorder
// @Desc   update order status of the order
// @access Private

router.get('/restaurant/updateorder/:order_id', auth, async(req, res) => {
    try {
        const restorder = await RestOrder.find({ restorder: req.params.order_id });
        if (!restorder) return res.status(400).json({ msg: 'No orders found' });
        res.json(restorder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /api/orders/restaurant/:orderStatus
// @Desc   View all the orders by orderstatus
// @access Private

router.get('/restaurant/:orderStatus', auth, async(req, res) => {
    try {
        const restorder = await RestOrder.find({
            $and: [{ orderStatus: req.params.orderStatus }, { restId: req.restuser.id }],
        }, );
        if (restorder.length === 0) return res.status(400).json({ msg: 'No orders with this status' });
        res.json(restorder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;