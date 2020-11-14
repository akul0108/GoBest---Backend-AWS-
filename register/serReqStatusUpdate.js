// Service Request Status Update

const mongoose = require('mongoose');

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Others?retryWrites=true&w=majority';

const serReqSchema = new mongoose.Schema({
    _id : Number,
    status : String
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
                var serReq = mongoose.model('SerReq', serReqSchema, 'SerReq');
                
                // const data = JSON.parse(event.body);
                
                const data = event;
                
                serReq.findOneAndUpdate(
                    {_id : data.id},
                    { status : data.status},
                    (err, success) => {
                        if(success)
                        callback(null, "Status updated successfully");
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