/* eslint-disable no-console */
const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const kafka = require('./kafka/client');

const app = express();

// connect databse
connectDB();

// use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Allow Access Control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Init middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('API running');
});

// Defining Routes
// Users
app.use('/api/users', require('./routes/api/Users/users'));
app.use('/api/profile', require('./routes/api/Users/profile'));
app.use('/api/auth', require('./routes/api/Users/auth'));

// Rest Users
app.use('/api/restusers', require('./routes/api/Restaurants/restusers'));
app.use('/api/restprofile', require('./routes/api/Restaurants/restprofile'));
app.use('/api/restauth', require('./routes/api/Restaurants/restauth'));

// Menu Items
app.use('/api/restaurant', require('./routes/api/RestaurantMenuItems/menuitems'));

// Events
app.use('/api/events', require('./routes/api/SocialEvents/socialevents'));

// Reviews
app.use('/api/reviews', require('./routes/api/RestaurantReviews/restreviews'));

// Orders
app.use('/api/orders', require('./routes/api/RestaurantOrders/restorders'));

// images
// get
app.use('/api/images', require('./routes/api/ProfilePhotos/getrestprofilepics'));
app.use('/api/userimages', require('./routes/api/ProfilePhotos/getuserprofilepics'));
// upload
app.use('/api/addimages', require('./routes/api/UploadPhotos/uploadrestprofilepic'));
app.use('/api/useraddimages', require('./routes/api/UploadPhotos/uploaduserprofilepic'));

// retsaurant search
app.use('/api/search', require('./routes/api/RestaurantSearch/search'));

// mulitple Images

// get image
app.use('/api/restimages', require('./routes/api/RestImages/getrestimages'));

// upload restaurant images
app.use('/api/addrestimages', require('./routes/api/RestImages/insertrestimages'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));