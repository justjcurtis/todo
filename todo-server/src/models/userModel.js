const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
