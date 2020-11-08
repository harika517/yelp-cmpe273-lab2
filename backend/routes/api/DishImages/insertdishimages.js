/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const path = require('path');
const multer = require('multer');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const RestProfile = require('../../../models/RestProfile');
const auth = require('../../../middleware/auth');

const userstorage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log('inside destination req.body is', req.body);
        const dir = `${path.join(__dirname, '../../../../')}/public/uploads/${req.params.Dish_Name.replace(' ', '_')}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        callback(null, dir);
    },
    filename: (req, file, cb) => {
        cb(
            null, file.originalname,
        );
    },
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 1000000000 },
}).single('image');

router.post('/:Dish_Name', auth, async(req, res) => {
    await useruploads(req, res, async(err) => {
        console.log('this is useruploads');
        if (!err) {
            // console.log('inside useruploads, req.file.filename is ', req.file.filename);
            try {
                // console.log('inside useruploads, req.body.RestName is', req.body.RestName);
                // console.log('inside useruploads, req.restuser.id', req.restuser.id);
                // console.log('inside useruploads, file is', req.file);
                console.log('inside useruploads, req.params.Dish_Name is', req.params.Dish_Name)
                console.log('inside useruploads, req.file.fileName is', req.file.filename)
                const objid = new ObjectId(req.restuser.id);
                //const restprofile = await RestProfile.findOneAndUpdate({ restuser: objid }, { $push: { 'menuitems.dishimages': req.file.filename } }, { new: true });
                //const restProfile = await RestProfile.findOne({ restuser: objid })
                // console.log("restprofile was obtained as", restProfile)
                // const menuitems = restProfile.menuitems
                // console.log("all menuitems is", menuitems)
                // const menuitemtoupdate = await menuitems.findOne({ itemName: req.params.Dish_Name })
                // console.log('query result is', menuitemtoupdate);
                // const menuitem = await RestProfile.findOneAndUpdate({ restuser: objid, 'menuitems.itemName': req.params.Dish_Name }, { $push: { 'menuitems.dishimages': req.file.filename } }, { new: true });
                const restprofile = await RestProfile.findOneAndUpdate({ "restuser": objid, 'menuitems.itemName': req.params.Dish_Name }, { $push: { 'menuitems.$.dishimages': req.file.filename } }, { new: true });
                console.log("restprofile is", restprofile)
                    // const menuitemtoupdate = restprofile.findOne({ "menuitems": { "itemName": "Deep-fried Mango Ice Cream" } })
                    // console.log("menuitem is", menuitemtoupdate)
                if (!restprofile) {
                    return res.status(400).json({ msg: 'Rest user profile not found' });
                }
                res.json(restprofile);
            } catch (error) {
                console.log('caught error', error);
                res.status(500).send('Try block Server Error');
            }
        } else {
            console.log('hit an error', err);
            res.status(500).send('Server Error');
        }
    });
});

module.exports = router;