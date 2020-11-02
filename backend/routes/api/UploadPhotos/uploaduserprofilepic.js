/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const path = require('path');
const multer = require('multer');
const { ObjectId } = require('mongodb');
const User = require('../../../models/User');
const auth = require('../../../middleware/auth');

const userstorage = multer.diskStorage({
    destination: `${path.join(__dirname, '../../../../')}/public/uploads`,
    filename: (req, file, cb) => {
        cb(
            null, `user_${
                req.user.id.replace('@', '_')
            }${path.extname(file.originalname)}`,
        );
    },
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 1000000000 },
}).single('image');

router.post('/user/addprofilepic/', auth, async(req, res) => {
    // console.log("inside image upload, email id is", req.customer.id);
    // console.log ("inside image upload, req is ", req);
    // console.log("inside image upload, image is,", req.get("image"));
    // console.log("inside image upload, Cust_Email,", req);
    // console.log("inside image upload, file,", file);
    // console.log("inside image upload, req is,", req.customer);
    // console.log("inside image upload, res is ", res);
    console.log('inside image upload, restuser id is,', req.user.id);

    // const Email = req.Email

    // console.log ("inside image upload, query result is,",JSON.stringify(restuser))
    console.log('outside req email is ', req.body.Email);
    // let restuser = RestUser.findOneAndUpdate({restEmail:req.body.Email},{image:"rest_" +req.restuser.id.replace("@", "_") +  path.extname(req.file.filename)},{new:true})
    // console.log ("outside query result is",restuser.restEmail)
    let user = null;
    await useruploads(req, res, async(err) => {
        console.log('this is useruploads');
        if (!err) {
            try {
                const objId = new ObjectId(req.user.id);
                await console.log('inside useruploads, req.file.filename is ', req.file.filename);
                await console.log('inside useruploads, req.body.Email is', req.body.Email);
                // console.log("inside useriploads, req.Email",req.restEmail)
                // console.log ("object id searched is,",objId)
                // let restuser = RestUser.findOneAndUpdate({id: objId },{image:req.file.filename})
                // RestUser.findById(objId).then(doc=>{console.log("doc was obtained as",doc)}).catch(err=>{console.log("hit error",err)})
                // let restuser = RestUser.findOneAndUpdate({restEmail:req.body.Email},{image:req.file.filename},{new:true}) //.then(doc=>{console.log("doc is",doc)}).catch(err=>{console.log("hit error",err)})
                user = await User.findOneAndUpdate({ userEmail: req.body.Email }, { image: req.file.filename }, { new: true });
                console.log('query result is', user.image);
                // console.log ("rest user,",restuser._id)
                // console.log ("query result is",RestUser.find({restEmail:req.body.Email}))
                if (!user) {
                    return res.status(400).json({ msg: 'Rest user profile not found' });
                }
                // restuser.save ()
                res.json(user);
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