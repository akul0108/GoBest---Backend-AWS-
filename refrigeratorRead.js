// Refrigerator Read

const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://Akul:8VuKhSsQ8ZUxfi0g@goback-au6tb.mongodb.net/Electronics?retryWrites=true&w=majority';

exports.handler = async function(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false, 
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    conn.model('Refrigerator', new mongoose.Schema({  }),'Refrigerator');
  }

  const M = conn.model('Refrigerator');

  const doc = await M.find();
  console.log(doc);

  return doc;
};