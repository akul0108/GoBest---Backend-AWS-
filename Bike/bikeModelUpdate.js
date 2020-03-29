// Bike Model Update

const mongoose = require('mongoose');

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Bike?retryWrites=true&w=majority';

const bikeModelSchema = new mongoose.Schema({
    brandId : String,
    model : String
});

module.exports.handler = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;

    mongoose.Promise = global.Promise;

    mongoose.connect(uri, {
        bufferCommands : false,
        bufferMaxEntries : 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify : false
        },
        (err) => {
            if(!err){
                var model = mongoose.model('model', bikeModelSchema, 'model');
                
                // const data = JSON.parse(event.body);
                
                const data = event;
                
                model.findOneAndUpdate(
                    {_id : data.id},
                    { 
                        brandId : data.brandId,
                        model : data.model 
                    },
                    (err, success) => {
                        if(success)
                        callback(null, "Success");
                        else
                        callback(err, "Error Occured");
                    }
                );   
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};