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

module.exports = { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage }