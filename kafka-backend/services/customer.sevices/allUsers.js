const UserProfile = require('../../models/UserProfile');

const handle_request = async(body, callback) => {
    let customers = await UserProfile.find();
    if (!customers) {
        callback({
            message: "No customers in DB!"
        }, null);
    }
    if (!callback) return customers

    return callback(null,
        customers
    );
}

exports.handle_request = handle_request;
// const handle_request = async(body, callback)
// try {

//         const profiles = await UserProfile.find().populate('user', ['userName', 'image', 'firstName', 'lastName', 'userEmail']);
//         if (profiles.length === 0) return res.status(400).json({ msg: 'There is no profile for this user' });
//         res.json(profiles);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }