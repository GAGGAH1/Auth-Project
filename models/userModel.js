const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: Number,
        default: 0 // 0 - User, 1 - Admin, 2 - Sub-Admin, 3 - Editor
    }
},{ timestamps: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
// module.exports = mongoose.models.User || mongoose.model('User', userSchema);