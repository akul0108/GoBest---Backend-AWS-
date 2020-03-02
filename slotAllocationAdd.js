// Slot Allocation

const mongoose = require('mongoose');

let i = 0;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Products?retryWrites=true&w=majority';

const slotSchema = new mongoose.Schema({
    dept: {type: String},   // Car / Bike / Electronics
    category : { type : String},  // Engine / Frames
    slotNo : { type : String}
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
                var slot = mongoose.model('Slot', slotSchema, 'Slot');
                
                // const data = JSON.parse(JSON.stringify(event));
                const data = event;
                // console.log(typeof(event.body));
                console.log(data);

                var Slot = new slot();
                Slot.dept = data.dept;
                Slot.category = data.category;
                Slot.branch_code = "GBSlot"+scode();
                Slot.save().then(() => callback(null, Slot))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};

function scode(){
    i++;
    return i;
}