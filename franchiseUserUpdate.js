// Franchiser user update API

// Franchise User Creation Method


const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

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
                console.log(data);
                // const data = event;

                // var User = new user();
                // User.save().then(() => callback(null, {
                //     statusCode: 200,
                //     body: JSON.stringify(User),
                // }))
                
                // .catch(err => callback(null, {
                //     body: JSON.stringify(err.keyPattern)
                // }));
                user.findByIdAndUpdate(data.id, data.body,
                    {new : true},
                    (err, doc) => {
                        if(err) {
                            callback(null, {
                                body: JSON.stringify(err)
                            })
                        }
                        else{
                            callback(null, {
                                body: JSON.stringify(doc)
                            })
                        }
                    })
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};