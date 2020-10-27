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
    restOrderFields.user = req.user.id;
    restOrderFields.restuser = req.params.restuser_id;
    restOrderFields.menuitems = req.params.menuitems_id;
    restOrderFields.orderStatus = 'New_Order';
    if (Quantiy) restOrderFields.Quantiy = Quantiy;
    if (deliveryMethod) restOrderFields.deliveryMethod = deliveryMethod;

    try {
        let restorder = await RestOrder.findOne({
            user: req.user.id,
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

// @route  GET /api/orders/me/:orderStatus
// @Desc   filter all the orders created by currently logged in user by order_status
// @access Private

// @route  GET /api/orders/restaurant
// @Desc   View all the orders made to the currently logged in restaurant
// @access Private

// @route  POST /api/orders/restaurant/update
// @Desc   update order status of the order
// @access Private

// @route  GET /api/orders/restaurant/:orderStatus
// @Desc   View all the orders by orderstatus
// @access Private
module.exports = router;