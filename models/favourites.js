// Core Modules
// const {getDb} = require("../utils/databaseUtil");
/** 
const {ObjectId,mongo} = require('mongodb');

module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save(){
    const db = getDb();
    return db.collection('favourites')
    .findOne({homeId:this.homeId})
    .then(favHome=>{
      if(!favHome){
        return db.collection('favourites')
        .insertOne(this);
      }
      return Promise.resolve();
    });
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
**/

const mongoose = require('mongoose');

const FavouriteSchema = mongoose.Schema(
  {
    homeId :{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: true,
      unique: true
    }
  }
)

module.exports = mongoose.model('Favourite', FavouriteSchema);