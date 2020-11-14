// Car Submodel Delete

const mongoose = require('mongoose');

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Car?retryWrites=true&w=majority';

const carSubmodelSchema = new mongoose.Schema({
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
                var brand = mongoose.model('submodel', carSubmodelSchema, 'submodel');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                brand.findOneAndDelete(
                    {_id : data.id},
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