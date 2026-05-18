const Newsletter = require('../models/Newsletter')

const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' })
    const existing = await Newsletter.findOne({ email: email.toLowerCase() })
    if (existing) return res.status(400).json({ success: false, message: 'Already subscribed!' })
    await Newsletter.create({ email })
    res.status(201).json({ success: true, message: 'Successfully subscribed to our newsletter!' })
  } catch (err) { next(err) }
}

module.exports = { subscribe }