const User = require('../models/User')
const Package = require('../models/Package')
const Booking = require('../models/Booking')
const Review = require('../models/Review')
const Newsletter = require('../models/Newsletter')

const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers, totalPackages, totalBookings, totalReviews, newsletterCount,
      revenueResult, recentBookings, topPackages, monthlyRevenue
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Package.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Review.countDocuments(),
      Newsletter.countDocuments(),
      Booking.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Booking.find().sort({ createdAt: -1 }).limit(5)
        .populate('user', 'name email')
        .populate('package', 'title destination'),
      Booking.aggregate([
        { $group: { _id: '$package', bookingCount: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } },
        { $sort: { bookingCount: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'packages', localField: '_id', foreignField: '_id', as: 'pkg' } },
        { $unwind: '$pkg' },
        { $project: { title: '$pkg.title', destination: '$pkg.destination', bookingCount: 1, revenue: 1 } }
      ]),
      Booking.aggregate([
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            revenue: { $sum: '$totalAmount' },
            bookings: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        { $limit: 12 }
      ])
    ])

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalPackages,
        totalBookings,
        totalReviews,
        newsletterCount,
        totalRevenue: revenueResult[0]?.total || 0,
        recentBookings,
        topPackages,
        monthlyRevenue
      }
    })
  } catch (err) { next(err) }
}

module.exports = { getDashboardStats }