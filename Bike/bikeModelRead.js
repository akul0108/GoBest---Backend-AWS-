// Bike model Read

const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Bike?retryWrites=true&w=majority';

exports.handler = async function(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false, 
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    conn.model('model', new mongoose.Schema({ }),'model');
  }

  const M = conn.model('model');
  // console.log(event.brandId);
  const doc = await M.find({brandId : event.brandId}, { brandId : 0, __v : 0 });
  console.log(doc);

  return doc;
};