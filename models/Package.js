// models/Package.js
// Defines the structure of a travel package

const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    duration: {
      type: Number,
      required: [true, 'Duration in days is required'],
      min: [1, 'Duration must be at least 1 day']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    availableSeats: {
      type: Number,
      required: [true, 'Available seats is required'],
      min: [0, 'Available seats cannot be negative']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600'
    },
    isActive: {
      type: Boolean,
      default: true  // Package is active by default
    },
    createdBy: {
      // This stores a REFERENCE to a User document
      // Instead of copying the user's data, we store their ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const Package = mongoose.model('Package', packageSchema)

module.exports = Package