// Car Products Add

const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Car?retryWrites=true&w=majority';

const cprodSchema = new mongoose.Schema({
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
                var cprod = mongoose.model('Products', cprodSchema, 'Products');
                
                // const data = JSON.parse(event.body);
                
                const data = event;

                var cProd = new cprod();
                cProd.submodelId = data.submodelId;
                cProd.category = data.category;
                cProd.prodName = data.prodName;
                cProd.article = data.article;
                cProd.prodColor = data.prodColor;
                cProd.prodPrice = data.prodPrice;
                cProd.prodWarranty = data.prodWarranty;
                cProd.prodQuantity = data.prodQuantity;
                cProd.slot = data.slot;
                cProd.save().then(() => callback(null, cProd))
                
                .catch(err => callback(null, {
                    body: JSON.stringify(err.keyPattern)
                }));
            }
            else{
                context.none(JSON.stringify(err,undefined,2));
            }
        });
};
