const Wishlist = require('../models/Wishlist')

const getWishlist = async (req, res, next) => {
  try {
    let wl = await Wishlist.findOne({ user: req.user.id }).populate('packages')
    if (!wl) wl = { packages: [] }
    res.json({ success: true, wishlist: wl.packages })
  } catch (err) { next(err) }
}

const toggleWishlist = async (req, res, next) => {
  try {
    const { packageId } = req.body
    let wl = await Wishlist.findOne({ user: req.user.id })
    if (!wl) wl = await Wishlist.create({ user: req.user.id, packages: [] })

    const idx = wl.packages.indexOf(packageId)
    let added
    if (idx === -1) {
      wl.packages.push(packageId)
      added = true
    } else {
      wl.packages.splice(idx, 1)
      added = false
    }
    await wl.save()
    res.json({ success: true, added, message: added ? 'Added to wishlist' : 'Removed from wishlist' })
  } catch (err) { next(err) }
}

module.exports = { getWishlist, toggleWishlist }