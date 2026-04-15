// middleware/authMiddleware.js
// This runs BEFORE protected routes to verify the user is logged in

const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    let token

    // JWT tokens are sent in the Authorization header like:
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract just the token part (remove "Bearer ")
      token = req.headers.authorization.split(' ')[1]
    }

    // If no token found, deny access
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in first.'
      })
    }

    // Verify the token using our secret key
    // If token is fake, expired, or tampered → jwt.verify throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // decoded.id is the user ID we put in the token during login
    // Find the user in database and attach to request
    req.user = await User.findById(decoded.id)
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists'
      })
    }

    // Call next() to move to the actual route handler
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.'
    })
  }
}

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.'
    })
  }
}

module.exports = { protect, adminOnly }