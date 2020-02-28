// img Add

const mongoose = require('mongoose');

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

let gfs;

// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Electronics?retryWrites=true&w=majority';

const bikeSchema = new mongoose.Schema({
    name : {type: String, unique: true},
    img: { data: Buffer, contentType: String }
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
                var bike = mongoose.model('brand', bikeSchema, 'brand');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var Bike = new bike();
                Bike.name = data.name;
                Bike.Imagename = data.Imagename;
                Bike.save().then(() => callback(null, Bike))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
