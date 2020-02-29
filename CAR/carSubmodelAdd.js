//Car Submodel Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Car?retryWrites=true&w=majority';

const carSchema = new mongoose.Schema({
    modelId : {type: Object},
    submodel : {type: String, unique: true}
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
                var car = mongoose.model('submodel', carSchema, 'submodel');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Car = new car();
                Car.modelId = data.modelId;
                Car.submodel = data.submodel;
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