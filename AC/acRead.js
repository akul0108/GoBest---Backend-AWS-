// AC Read

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
    conn.model('AC', new mongoose.Schema({  }),'AC');
  }

  const M = conn.model('AC');

  const doc = await M.find({type : event.type}, { type : 0, __v : 0 });
  console.log(doc);

  return doc;
};