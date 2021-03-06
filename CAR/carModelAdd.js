// Car Model Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Car?retryWrites=true&w=majority';

const carSchema = new mongoose.Schema({
    brandId : {type: Object},
    model : {type: String, unique: true}
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
                var car = mongoose.model('model', carSchema, 'model');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Car = new car();
                Car.brandId = data.brandId;
                Car.model = data.model;
                Car.save().then(() => callback(null, Car))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};