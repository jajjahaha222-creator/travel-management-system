const Coupon = require('../models/Coupon')

const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.body
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true })
    if (!coupon) return res.status(404).json({ success: false, message: 'Invalid coupon code' })
    if (coupon.expiresAt < new Date()) return res.status(400).json({ success: false, message: 'Coupon has expired' })
    if (coupon.usedCount >= coupon.maxUses) return res.status(400).json({ success: false, message: 'Coupon usage limit reached' })
    res.json({ success: true, discountPercent: coupon.discountPercent, message: `${coupon.discountPercent}% discount applied!` })
  } catch (err) { next(err) }
}

const createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body)
    res.status(201).json({ success: true, coupon })
  } catch (err) { next(err) }
}

const listCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 })
    res.json({ success: true, coupons })
  } catch (err) { next(err) }
}

module.exports = { validateCoupon, createCoupon, listCoupons }