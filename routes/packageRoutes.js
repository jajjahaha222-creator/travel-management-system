// routes/packageRoutes.js
const express = require('express')
const router = express.Router()
const {
  createPackage, getAllPackages, getPackageById, updatePackage, deletePackage
} = require('../controllers/packageController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// Public routes (no login required)
router.get('/', getAllPackages)
router.get('/:id', getPackageById)

// Protected routes (login required + admin only)
router.post('/', protect, adminOnly, createPackage)
router.put('/:id', protect, adminOnly, updatePackage)
router.delete('/:id', protect, adminOnly, deletePackage)

module.exports = router