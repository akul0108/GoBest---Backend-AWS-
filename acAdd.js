// Electronics AC Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Electronics?retryWrites=true&w=majority';

const acSchema = new mongoose.Schema({
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
                var ac = mongoose.model('AC', acSchema, 'AC');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var AC = new ac();
                AC.brand = data.brand;
                AC.type = data.type;
                AC.imgstr = data.imgstr;
                AC.save().then(() => callback(null, AC))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
