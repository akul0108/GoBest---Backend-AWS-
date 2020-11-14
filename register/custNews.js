// News (Get Method/)

const mongoose = require('mongoose');
const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Others?retryWrites=true&w=majority';
let conn = null;

exports.handler = async function(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    if (conn == null) {
      conn = await mongoose.createConnection(uri, {
        bufferCommands: false, 
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      conn.model('News', new mongoose.Schema({  }),'News');
    }
  
    const M = conn.model('News');
  
    const doc = await M.find({ read: false });
    console.log(doc);
  
    return doc;
  };