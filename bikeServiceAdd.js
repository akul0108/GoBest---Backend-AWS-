//Bike Service Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Bike?retryWrites=true&w=majority';

const bikeSchema = new mongoose.Schema({
    submodelId : {type: Object},
    serviceName : {type: String},
    serviceCost : { type: Number }
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
                var bike = mongoose.model('services', bikeSchema, 'services');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Bike = new bike();
                Bike.submodelId = data.submodelId;
                Bike.serviceName = data.serviceName;
                Bike.serviceCost = data.serviceCost;
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
