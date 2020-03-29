// Customer Vehicle Update

const mongoose = require('mongoose');

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/User?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
    vehicle : []
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
                var user = mongoose.model('customers', userSchema, 'customers');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var vehicle = { 
                    vehicleType : data.vehicleType,
                    brand : data.brand,
                    model : data.model,
                    submodel : data.submodel,
                    makingYear : data.makingYear,
                    fuelType : data.fuelType,
                    kmDriven : data.kmDriven,
                    lastServiceDate : data.lastServiceDate,
                    lastServiceKm : data.lastServiceKm,
                    vehicleNo : data.vehicleNo
                };

                // user.update(
                //     {_id : data.id},
                //     { $push : { vehicle : vehicle}},
                //     (doc) => callback(null, "Vehicle Saved Successfully")
                    
                //     .catch(err => callback(err, {
                //         body : JSON.stringify(err)
                //     }))
                // );
                
                user.findOneAndUpdate(
                    {_id : data.id},
                    { vehicle : vehicle},
                    (err, success) => {
                        if(success)
                        callback(null, "Vehicle updated successfully");
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