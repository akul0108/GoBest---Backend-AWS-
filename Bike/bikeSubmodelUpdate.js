// Bike Submodel Update

const mongoose = require('mongoose');

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Bike?retryWrites=true&w=majority';

const bikeSubmodelSchema = new mongoose.Schema({
    modelId : String,
    submodel : String
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
                var submodel = mongoose.model('submodel', bikeSubmodelSchema, 'submodel');
                
                // const data = JSON.parse(event.body);
                
                const data = event;
                
                submodel.findOneAndUpdate(
                    {_id : data.id},
                    { 
                        modelId : data.modelId,
                        submodel : data.submodel
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