const mongoose = require('mongoose');
const Promise = require('bluebird');
const conn = null;
const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/User?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
    username : {type: String, unique: true}
});

module.exports.franchiseUsers = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;

    mongoose.Promise = Promise;

    mongoose.connect(uri, {bufferCommands : false,
        bufferMaxEntries : 0,
        useNewUrlParser: true,
        useUnifiedTopology: true},
        (err) => {
            if(!err){
                var user = mongoose.model('franchiseUsers', userSchema, 'franchiseUsers');
                
                const data = JSON.parse(event.body);
               
                var User = new user();
                User.username = data.username;
               
                User.save().then(() => callback(null, {
                    statusCode: 200,
                    body : JSON.stringify(User),
                }),
                
                callback (err, {
                    statusCode: err.code,
                    body: err.message 
                }))
                
                .catch(err => callback(err, {
                    statusCode: err.code,
                    body : err.message
                }))    
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
}