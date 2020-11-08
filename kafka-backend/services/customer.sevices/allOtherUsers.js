// const UserProfile = require('../../models/UserProfile');

// const handle_request = async(body, callback) => {
//     const checkObjId = new ObjectId(req.user.id);
//     let customers = await UserProfile.find().populate('user', ['userName', 'image', 'firstName', 'lastName', 'userEmail']);
//     const results = customers.filter((prof) => (!prof.user._id.equals(checkObjId)));

//     if (!results) {
//         callback({
//             message: "No customers in DB!"
//         }, null)
//     }
//     if (!callback) return customers

//     callback(null,
//         customers
//     )
// }

// exports.handle_request = handle_request;

// const profiles = await UserProfile.find().populate('user', ['userName', 'image', 'firstName', 'lastName', 'userEmail']);
//         const results = profiles.filter((prof) => (!prof.user._id.equals(checkObjId)));
//         res.json(results);