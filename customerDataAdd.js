// Customer Add

const mongoose = require('mongoose');

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/User?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
    uid : { type : String},
    email : { type : String},
    name : { type : String},
    contact : {type : Number}
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
                var user = mongoose.model('customers', userSchema, 'customers');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var User = new user();
                User.uid = data.uid;
                User.email = data.email;
                User.name = data.name;
                User.contact = data.contact;
                User.save().then(() => callback(null, User))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
