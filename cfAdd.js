// Electronics Ceiling Fan Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Electronics?retryWrites=true&w=majority';

const cfSchema = new mongoose.Schema({
    brand : {type: String},
    imgstr : {type:String}
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
                var cf = mongoose.model('CF', cfSchema, 'CF');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var CF = new cf();
                CF.brand = data.brand;
                CF.imgstr = data.imgstr;
                CF.save().then(() => callback(null, CF))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
