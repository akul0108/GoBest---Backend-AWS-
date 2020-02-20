// Franchise User Creation Method


const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

let i = 0;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/User?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
    username : {type: String, unique: true},
    email : {type: String, unique: true},
    fname : {type: String},
    lname : {type: String},
    gender : {type: String},
    phone : {type: Number, unique: true},
    // Address Details
    address : {type: String},
    city : {type: String},
    district : {type: String},
    zip_code : {type: Number},
    state : {type: String},
    // Bank Details
    bank_name : {type: String},
    bank_ifsc : {type: String},
    account_holder_name : {type: String},
    account_number: {type: Number, unique: true},
    // Company Details
    director: {type: String},
    branch_name: {type: String, unique: true},
    branch_code: {type: String, unique: true},
    registration_number: {type: String, unique: true},
    company_address: {type: String},
    approval: {type: Boolean}
});

module.exports.handler = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;

    mongoose.Promise = global.Promise;

    mongoose.connect(uri, {
        bufferCommands : false,
        bufferMaxEntries : 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
        },
        (err) => {
            if(!err){
                var user = mongoose.model('franchiseUsers', userSchema, 'franchiseUsers');
                
                const data = JSON.parse(event.body);
                
                // const data = event;

                var User = new user();
                User.username = data.username;
                User.email = data.email;
                User.fname = data.fname;
                User.lname = data.lname;
                User.gender = data.gender;
                User.phone = data.phone;
                // Address Details
                User.address = data.address;
                User.city = data.city;
                User.district = data.district;
                User.zip_code = data.zip_code;
                User.state = data.state;
                // Bank Details
                User.bank_name = data.bank_name;
                User.bank_ifsc = data.bank_ifsc;
                User.account_holder_name = data.account_holder_name;
                User.account_number = data.account_number;
                // Company Details
                User.director = data.director;
                User.branch_name = data.branch_name;
                User.branch_code = "GB"+bcode();
                User.registration_number = data.registration_number;
                User.company_address = data.company_address;
                User.approval = data.approval || false;
                User.save().then(() => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(User),
                }))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};

function bcode(){
    i++;
    return i;
}