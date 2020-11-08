const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs');
const auth = require('../../../middleware/auth');

router.get('/:DishName/:Pic', async(req, res) => {
    console.log(
        'inside get image, req.params.Pic is',
        req.params.Pic,
    );
    console.log('inside get image, req.params.DishName is', req.params.DishName)
    const image = `${path.join(__dirname, '../../../../')}/public/uploads/${req.params.DishName.replace(" ","_")}/${
        req.params.Pic
    }`;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    } else {
        res.sendFile(
            `${path.join(
                __dirname,
                '../../../../',
            )}/public/uploads/dishplaceholder.jpg`,
        );
    }
});

module.exports = router;