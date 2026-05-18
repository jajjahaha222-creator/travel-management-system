const express = require('express')
const router = express.Router()
const { validateCoupon, createCoupon, listCoupons } = require('../controllers/couponController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.post('/validate', protect, validateCoupon)
router.post('/', protect, adminOnly, createCoupon)
router.get('/', protect, adminOnly, listCoupons)

module.exports = router