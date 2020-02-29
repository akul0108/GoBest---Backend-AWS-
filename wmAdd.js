// Electronics Washing Machine Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Electronics?retryWrites=true&w=majority';

const wmSchema = new mongoose.Schema({
    brand : {type: String},
    type : {type:String},
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
                var wm = mongoose.model('WM', wmSchema, 'WM');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var WM = new wm();
                WM.brand = data.brand;
                WM.type = data.type;
                WM.imgstr = data.imgstr;
                WM.save().then(() => callback(null, WM))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
