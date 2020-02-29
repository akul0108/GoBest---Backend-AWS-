// Electronics Refrigerator Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Electronics?retryWrites=true&w=majority';

const refrigeratorSchema = new mongoose.Schema({
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
                var refrigerator = mongoose.model('Refrigerator', refrigeratorSchema, 'Refrigerator');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Refrigerator = new refrigerator();
                Refrigerator.brand = data.brand;
                Refrigerator.type = data.type;
                Refrigerator.imgstr = data.imgstr;
                Refrigerator.save().then(() => callback(null, Refrigerator))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
