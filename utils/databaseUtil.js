const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = process.env.MONGODB_URI || "mongodb+srv://root:root@cluster0.cmjrysn.mongodb.net/airbnb?retryWrites=true&w=majority";
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then(client => {
      console.log("Connected to MongoDB");
      _db = client.db('cluster0');
      callback(client);
    })
    .catch(err => {
      console.log("Failed to connect to MongoDB", err);
    });
}

const getDb = ()=>{
  if(!_db){
    throw "No database found!";
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb; 