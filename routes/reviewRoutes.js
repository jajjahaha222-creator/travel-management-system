const express = require('express')
const router = express.Router({ mergeParams: true }) // mergeParams lets us access :packageId
const { getReviews, createReview, deleteReview } = require('../controllers/reviewController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', getReviews)
router.post('/', protect, createReview)
router.delete('/:id', protect, deleteReview)

module.exports = router