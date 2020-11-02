const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs');
const auth = require('../../../middleware/auth');

router.get('/rest/:ProfilePic', async(req, res) => {
    console.log(
        'inside get image, req.params.ProfilePic is',
        req.params.ProfilePic,
    );
    const image = `${path.join(__dirname, '../../../../')}/public/uploads/${
        req.params.ProfilePic
    }`;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    } else {
        res.sendFile(
            `${path.join(
                __dirname,
                '../../../../',
            )}/public/uploads/restplaceholder.jpg`,
        );
    }
});

module.exports = router;