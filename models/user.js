const mongoose = require('mongoose');
// const Fav = require('./favourites');
// const favourites = require('./home');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: [true,"Password is required"]
    },
    role: {
      type:String,
      enum: ['guest', 'host'],
      default: 'guest'
    },
    favourites:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
      }
    ]
  }
);

module.exports = mongoose.model('User', userSchema);