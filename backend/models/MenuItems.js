const mongoose = require('mongoose');

const MenuItemsSchema = new mongoose.Schema({
    restuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restuser',
    },
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
    },
    itemIngredients: {
        type: String,
    },
    itemPrice: {
        type: String,
        required: true,
    },
    itemCategory: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
    },
    dishimages: [String],
});

const MenuItems = mongoose.model('menuitems', MenuItemsSchema);
module.exports = MenuItems;