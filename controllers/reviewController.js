const Review = require('../models/Review')
const Booking = require('../models/Booking')

// GET /api/packages/:packageId/reviews
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ package: req.params.packageId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
    res.json({ success: true, count: reviews.length, reviews })
  } catch (err) { next(err) }
}

// POST /api/packages/:packageId/reviews
const createReview = async (req, res, next) => {
  try {
    const { rating, title, body } = req.body
    const packageId = req.params.packageId

    // Must have booked this package
    const booked = await Booking.findOne({ user: req.user.id, package: packageId })
    if (!booked) {
      return res.status(403).json({ success: false, message: 'You must have booked this package to review it' })
    }

    const existing = await Review.findOne({ user: req.user.id, package: packageId })
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this package' })
    }

    const review = await Review.create({ user: req.user.id, package: packageId, rating, title, body })
    const populated = await review.populate('user', 'name avatar')
    res.status(201).json({ success: true, review: populated })
  } catch (err) { next(err) }
}

// DELETE /api/reviews/:id
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' })
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }
    await review.deleteOne()
    await Review.calcAverageRating(review.package)
    res.json({ success: true, message: 'Review deleted' })
  } catch (err) { next(err) }
}

module.exports = { getReviews, createReview, deleteReview }