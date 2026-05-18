const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    availableSeats: { type: Number, required: true, min: 0 },
    totalSeats: { type: Number },   // track original capacity
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800'
    },
    images: [String],               // gallery
    category: {
      type: String,
      enum: ['beach', 'mountain', 'city', 'adventure', 'cultural', 'wildlife', 'luxury'],
      default: 'city'
    },
    tags: [String],                 // e.g. ['family', 'honeymoon', 'solo']
    highlights: [String],           // bullet points shown on card
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

// Text index for search
packageSchema.index({ title: 'text', destination: 'text', description: 'text', tags: 'text' })

module.exports = mongoose.model('Package', packageSchema)