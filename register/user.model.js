require('../config/config');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    email: { type: String, unique: true},
    fname: { type: String},
    lname: { type: String},
    contact: { type: Number},
    gender: { type: String},
    address: { type: String},
    password: {type: String},
    saltSecret: {type: String}    
});

//Events
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);