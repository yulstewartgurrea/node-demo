const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: false
    },
    birthday: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
}, { timestamps: true});

module.exports = mongoose.model('user', userSchema)