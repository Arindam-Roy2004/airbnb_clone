// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourites = require("./favourites");
const homeDataPath = path.join(rootDir, "data", "homes.json");
const {getDb} = require("../utils/databaseUtil");
const {ObjectId,mongo} = require('mongodb');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl,description,_id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if(_id) this._id = _id;
  }

  save() {
    const db = getDb();
    
    return db.collection('homes').insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('homes')
      .find({})
      .toArray();
  }

  static findbyId(id) {
    const db = getDb();
    return db.collection('homes')
    .find({_id: new ObjectId(String(id))})
    .next();
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('homes')
    .deleteOne({_id: new ObjectId(String(id))});
  }
};
