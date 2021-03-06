// Bike Brand Delete

const mongoose = require('mongoose');

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Bike?retryWrites=true&w=majority';

const bikeBrandSchema = new mongoose.Schema({
    brand : String
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
                var brand = mongoose.model('brand', bikeBrandSchema, 'brand');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                brand.findOneAndDelete(
                    {_id : data.id},
                    (err, success) => {
                        if(success)
                        callback(null, "Brand deleted successfully");
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