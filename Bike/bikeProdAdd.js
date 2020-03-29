// Bike Products Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Bike?retryWrites=true&w=majority';

const bprodSchema = new mongoose.Schema({
    submodelId : { type : String},
    category : { type : String},
    prodName : { type : String},
    article : { type : String},
    prodColor : { type : String},
    prodPrice : { type : Number},
    prodWarranty : { type : Number },
    prodQuantity : { type : Number},
    slot : { type : String}
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
                var bprod = mongoose.model('Products', bprodSchema, 'Products');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var bProd = new bprod();
                bProd.submodelId = data.submodelId;
                bProd.category = data.category;
                bProd.prodName = data.prodName;
                bProd.article = data.article;
                bProd.prodColor = data.prodColor;
                bProd.prodPrice = data.prodPrice;
                bProd.prodWarranty = data.prodWarranty;
                bProd.prodQuantity = data.prodQuantity;
                bProd.slot = data.slot;
                bProd.save().then(() => callback(null, bProd))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
