const mongoose = require('mongoose');
// const Fav = require('./favourites');
// const favourites = require('./home');

const bookingSchema = mongoose.Schema({
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  guest: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true
  }
}
);

module.exports = mongoose.model('Bookings', bookingSchema);