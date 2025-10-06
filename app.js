const express = require('express');

require('dotenv').config();

const connectDB = require("./config/db")

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/authRoute');
// const adminRoutes = require('./routes/adminRoute');

// Routes   
app.use('/api/user', authRoutes);
// app.use('/api/admin', adminRoutes);





connectDB().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`)
    });
});


