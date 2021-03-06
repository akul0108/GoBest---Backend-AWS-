// Bike Model Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Bike?retryWrites=true&w=majority';

const bikeSchema = new mongoose.Schema({
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
                var bike = mongoose.model('model', bikeSchema, 'model');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Bike = new bike();
                Bike.brandId = data.brandId;
                Bike.model = data.model;
                Bike.save().then(() => callback(null, Bike))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
