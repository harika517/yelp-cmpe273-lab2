/* eslint-disable no-console */
const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

const app = express();

// connect databse
connectDB();

// Init middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('API running');
});

// Defining Routes

app.use('/api/users', require('./routes/api/Users/users'));
app.use('/api/profile', require('./routes/api/Users/profile'));
app.use('/api/auth', require('./routes/api/Users/auth'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));