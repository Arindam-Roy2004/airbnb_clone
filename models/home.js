
/** 
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

    if(this._id){ // update
      return db.collection('homes').
      updateOne(
        {_id: new ObjectId(String(this._id))},
        {$set : this}
      )
    }
    else{ // insert
      return db.collection('homes').insertOne(this);
    }
  }

  static find() {
    const db = getDb();
    return db.collection('homes')
      .find({})
      .toArray();
  }

  static findById(id) {
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
**/

const mongoose = require('mongoose');
// const Fav = require('./favourites');

const homeSchema = mongoose.Schema(
  {
    houseName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    photoUrl: String,
    description: String
  }
)

// homeSchema.pre('findOneAndDelete', async function(next){
//   const homeId = this.getQuery()['_id'];
//   await Fav.deleteMany({homeId:homeId});
//   next();
// })

module.exports = mongoose.model('Home',homeSchema);