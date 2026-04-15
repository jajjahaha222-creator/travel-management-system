// models/Booking.js
// Links a user to a travel package (the booking)

const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model
      required: true
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',  // Reference to the Package model
      required: true
    },
    numberOfSeats: {
      type: Number,
      required: [true, 'Number of seats is required'],
      min: [1, 'Must book at least 1 seat']
    },
    totalAmount: {
      type: Number,
      required: true
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required']
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'confirmed'
    }
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking