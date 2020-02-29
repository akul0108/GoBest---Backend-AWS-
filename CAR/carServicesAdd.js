//Car Services Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Car?retryWrites=true&w=majority';

const carSchema = new mongoose.Schema({
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
                var car = mongoose.model('services', carSchema, 'services');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Car = new car();
                Car.submodelId = data.submodelId;
                Car.serviceName = data.serviceName;
                Car.serviceCost = data.serviceCost;
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