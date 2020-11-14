// Electronics Service Request Add

const mongoose = require('mongoose');
const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Others?retryWrites=true&w=majority';

const eleSerReqSchema = new mongoose.Schema({
    _id: {type: Number},
    cid : {type:String},
    cat : {type:String},
    subcat : {type:String},
    imgurl : { type: String},
    msg: {type: String},
    pincode: {type: Number}
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
                var sr = mongoose.model('SerReq', eleSerReqSchema, 'SerReq');
                enquiry.find().sort({_id:-1}).limit(1).then( res => {
                    const data = event;
                    var SR = new sr();
                    
                    SR._id = res[0]._id + 1,
                    SR.cid = data.cid,
                    SR.cat = data.cat,
                    SR.subcat = data.subcat,
                    SR.imgurl = data.imgurl,
                    SR.msg = data.msg,
                    SR.pincode = data.pincode
                    SR.save().then(() => callback(null, SR))
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