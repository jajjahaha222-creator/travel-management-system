const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    title: {
      type: String,
      required: [true, 'Review title is required'],
      trim: true,
      maxlength: 100
    },
    body: {
      type: String,
      required: [true, 'Review body is required'],
      maxlength: 1000
    }
  },
  { timestamps: true }
)

// One review per user per package
reviewSchema.index({ user: 1, package: 1 }, { unique: true })

// Auto-update package average rating after save/delete
reviewSchema.statics.calcAverageRating = async function (packageId) {
  const stats = await this.aggregate([
    { $match: { package: packageId } },
    { $group: { _id: '$package', avgRating: { $avg: '$rating' }, numReviews: { $sum: 1 } } }
  ])
  if (stats.length > 0) {
    await mongoose.model('Package').findByIdAndUpdate(packageId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
      numReviews: stats[0].numReviews
    })
  } else {
    await mongoose.model('Package').findByIdAndUpdate(packageId, {
      averageRating: 0,
      numReviews: 0
    })
  }
}

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.package)
})

reviewSchema.post('remove', function () {
  this.constructor.calcAverageRating(this.package)
})

module.exports = mongoose.model('Review', reviewSchema)