// Enquiry Add

const mongoose = require('mongoose');
const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Others?retryWrites=true&w=majority';

const enqSchema = new mongoose.Schema({
    _id: {type: Number},
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
                enquiry.find().sort({_id:-1}).limit(1).then( res => {
                    console.log(res[0]._id)
                    const data = event;
                    var Enquiry = new enquiry();
                    
                    Enquiry._id = res[0]._id + 1,
                    Enquiry.email = data.email,
                    Enquiry.contact = data.contact,
                    Enquiry.msg = data.msg
                    Enquiry.save().then(() => callback(null, Enquiry))
                    .catch(err => callback(null, {
                        body: JSON.stringify(err.keyPattern)
                    }));
                });
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};