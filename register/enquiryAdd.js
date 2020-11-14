// Enquiry Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Others?retryWrites=true&w=majority';

const enqSchema = new mongoose.Schema({
    _id: {type: String},
    email : {type:String},
    contact : {type: Number},
    msg: {type: String}
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
                var enquiry = mongoose.model('Enquiry', enqSchema, 'Enquiry');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Enquiry = new enquiry();
                Enquiry._id = data.id,
                Enquiry.email = data.email,
                Enquiry.contact = data.contact,
                Enquiry.msg = data.msg
                Enquiry.save().then(() => callback(null, Enquiry))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
