const RestUser = require('../../../models/RestUser');
const RestProfile = require('../../../models/RestProfile');

const res = {}

const handle_request = async(myData, callback) => {
    // const { topic } = body;
    const topic = myData.topic;
    console.log("In topic", topic)
    switch (topic) {
        case 'getDishesByRestID':
            return getDishesByRestID(myData, callback);
        case 'getCurrentRestDishes':
            return getCurrentRestDishes(myData, callback);
        case 'getMenuItemDetail':
            return getMenuItemDetail(myData, callback);
        case 'editMenuItem':
            return editMenuItem(myData, callback);

    }
}

async function getDishesByRestID(myData, callback) {
    const restUserID = myData.restUserID
    try {
        console.log("Inside Try getSearchEvent")
        const restprofile = await RestProfile.findOne({ restuser: restUserID });
        const results = await restprofile.menuitems;
        console.log(results)
        if (results.length === 0) {
            res.status = 400;
            res.message = "No Menu created for this restaurent";
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

async function getCurrentRestDishes(myData, callback) {
    const restUserID = myData.restUserID
    try {
        console.log("Inside Try getCurrentRestDishes")
        const restprofile = await RestProfile.findOne({ restuser: restUserID });
        const results = await restprofile.menuitems;
        console.log(results)
        if (results.length === 0) {
            res.status = 400;
            res.message = "No Menu created for this restaurent";
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

async function getMenuItemDetail(myData, callback) {
    const menuitemID = myData.menuitemID
    const restUserID = myData.restUserID
    try {
        console.log("Inside Try getCurrentRestDishes")
        const restprofile = await RestProfile.findOne({
            $and: [{ restuser: restUserID },
                { 'menuitems._id': menuitemID }
            ],
        });
        console.log("restprofile", restprofile)
        const itemIndex = restprofile.menuitems.map((item) => item.id).indexOf(menuitemID);
        const menuitem = await restprofile.menuitems[itemIndex];

        // const results = await restprofile.menuitems;
        console.log(menuitem)
        if (!menuitem) {
            res.status = 400;
            res.message = "No Menu Item";
            return callback(null, res);
        }
        res.status = 200
        res.message = menuitem
        return callback(null, res);
    } catch (err) {
        res.status = 500
        res.message = "server Error"
        return callback(null, res);
    }
}

async function editMenuItem(myData, callback) {
    const menuID = myData.menuID
    const restUserID = myData.restUserID
    try {
        console.log("Inside Try getCurrentRestDishes")
        const results = await RestProfile.findOneAndUpdate({ restuser: restUserID, 'menuitems._id': menuID }, {
            $set: {
                'menuitems.$.itemName': itemName,
                'menuitems.$.itemDescription': itemDescription,
                'menuitems.$.itemIngredients': itemIngredients,
                'menuitems.$.itemPrice': itemPrice,
                'menuitems.$.itemCategory': itemCategory,
            }
        }, { new: true });
        console.log("restprofile", restprofile)

        // const results = await restprofile.menuitems;
        console.log(results)
        if (results.length === 0) {
            res.status = 400;
            res.message = "No Menu Item";
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