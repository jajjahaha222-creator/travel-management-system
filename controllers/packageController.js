// controllers/packageController.js  ← CORRECTED VERSION

const Package = require('../models/Package')

// ✅ (req, res, next) on every function
const createPackage = async (req, res, next) => {
  try {
    const { title, destination, description, duration, price, availableSeats, image } = req.body

    if (!title || !destination || !description || !duration || !price || !availableSeats) {
      return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    const newPackage = await Package.create({
      title,
      destination,
      description,
      duration,
      price,
      availableSeats,
      image,
      createdBy: req.user.id
    })

    res.status(201).json({
      success: true,
      message: 'Travel package created successfully',
      package: newPackage
    })
  } catch (error) {
    next(error)  // ✅
  }
}

const getAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: packages.length, packages })
  } catch (error) {
    next(error)
  }
}

const getPackageById = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id)
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' })
    }
    res.status(200).json({ success: true, package: pkg })
  } catch (error) {
    next(error)
  }
}

const updatePackage = async (req, res, next) => {
  try {
    const updated = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Package not found' })
    }
    res.status(200).json({ success: true, message: 'Package updated', package: updated })
  } catch (error) {
    next(error)
  }
}

const deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id)
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' })
    }
    res.status(200).json({ success: true, message: 'Package deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// Add to packageController.js exports

// GET /api/packages/search?q=goa&category=beach&minPrice=5000&maxPrice=50000&sort=price
const searchPackages = async (req, res, next) => {
  try {
    const { q, category, minPrice, maxPrice, sort, duration, page = 1, limit = 9 } = req.query
    const query = { isActive: true }

    if (q) query.$text = { $search: q }
    if (category) query.category = category
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    if (duration) query.duration = { $lte: Number(duration) }

    let sortObj = { createdAt: -1 }
    if (sort === 'price_asc') sortObj = { price: 1 }
    else if (sort === 'price_desc') sortObj = { price: -1 }
    else if (sort === 'rating') sortObj = { averageRating: -1 }
    else if (sort === 'popular') sortObj = { numReviews: -1 }

    const skip = (Number(page) - 1) * Number(limit)
    const [packages, total] = await Promise.all([
      Package.find(query).sort(sortObj).skip(skip).limit(Number(limit)),
      Package.countDocuments(query)
    ])

    res.json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      packages
    })
  } catch (err) { next(err) }
}

module.exports = { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage,searchPackages}