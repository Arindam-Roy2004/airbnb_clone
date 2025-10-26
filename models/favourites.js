// Core Modules
const {getDb} = require("../utils/databaseUtil");
const {ObjectId,mongo} = require('mongodb');

module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save(){
    const db = getDb();
    return db.collection('favourites').insertOne(this);
  }

  static getAllFavs() {
    const db = getDb();
    return db.collection('favourites')
    .find()
    .toArray();
  }
  static deleteFromFavourites(delHomeId){
    const db = getDb();

    return db.collection('favourites')
    .deleteOne({homeId:delHomeId});
  }
};
