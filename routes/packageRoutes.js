// routes/packageRoutes.js
const express = require('express')
const router = express.Router()
const {
  createPackage, getAllPackages, getPackageById,
  updatePackage, deletePackage, searchPackages
} = require('../controllers/packageController')
const { protect, adminOnly } = require('../middleware/authMiddleware')
const reviewRouter = require('./reviewRoutes')


router.get('/search', searchPackages)
router.get('/', getAllPackages)
router.get('/:id', getPackageById)
router.post('/', protect, adminOnly, createPackage)
router.put('/:id', protect, adminOnly, updatePackage)
router.delete('/:id', protect, adminOnly, deletePackage)
module.exports = router