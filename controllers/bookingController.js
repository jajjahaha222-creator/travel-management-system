// controllers/bookingController.js  ← CORRECTED VERSION

const Booking = require('../models/Booking')
const Package = require('../models/Package')

const createBooking = async (req, res, next) => {
  try {
    const { packageId, numberOfSeats, travelDate } = req.body

    if (!packageId || !numberOfSeats || !travelDate) {
      return res.status(400).json({
        success: false,
        message: 'Package, seats, and travel date are required'
      })
    }

    const travelPackage = await Package.findById(packageId)
    if (!travelPackage) {
      return res.status(404).json({ success: false, message: 'Package not found' })
    }

    if (travelPackage.availableSeats < numberOfSeats) {
      return res.status(400).json({
        success: false,
        message: `Only ${travelPackage.availableSeats} seats available`
      })
    }

    const totalAmount = travelPackage.price * numberOfSeats

    const booking = await Booking.create({
      user: req.user.id,
      package: packageId,
      numberOfSeats,
      totalAmount,
      travelDate,
      status: 'confirmed'
    })

    travelPackage.availableSeats -= numberOfSeats
    await travelPackage.save()

    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate('package', 'title destination price')

    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      booking: populatedBooking
    })
  } catch (error) {
    next(error)  // ✅
  }
}

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package', 'title destination price image duration')
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: bookings.length, bookings })
  } catch (error) {
    next(error)
  }
}

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('package', 'title destination price')
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: bookings.length, bookings })
  } catch (error) {
    next(error)
  }
}

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' })
    }

    if (booking.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      })
    }

    await Package.findByIdAndUpdate(booking.package, {
      $inc: { availableSeats: booking.numberOfSeats }
    })

    await Booking.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: 'Booking cancelled successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = { createBooking, getMyBookings, getAllBookings, cancelBooking }