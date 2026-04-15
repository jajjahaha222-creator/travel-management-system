// server.js
// This is the ENTRY POINT of our entire application
// It's like the "main switch" that turns everything on

// Import the packages we installed
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

// Import our database connection function (we'll create this next)
const connectDB = require('./config/db')

// Load environment variables from .env file
// This must happen BEFORE we use any process.env values
dotenv.config()

// Import our route files (we'll create these step by step)
const authRoutes = require('./routes/authRoutes')
const packageRoutes = require('./routes/packageRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

// Create the Express application
const app = express()

// ─── MIDDLEWARE ────────────────────────────────────────────────────
// Middleware = functions that run on EVERY request before your route handler

// Allow our frontend (different port/domain) to talk to this server
app.use(cors())

// Parse incoming JSON data from request body
// Without this, req.body would be undefined
app.use(express.json())

// Serve static files (our HTML/CSS/JS frontend) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')))

// ─── ROUTES ────────────────────────────────────────────────────────
// Tell Express: "If a request starts with /api/auth, use authRoutes"
app.use('/api/auth', authRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/bookings', bookingRoutes)

// ─── ROOT ROUTE ────────────────────────────────────────────────────
// When someone visits http://localhost:5000/api
// This is just a health check
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Travel Management System API is running!',
    status: 'OK'
  })
})

// ─── GLOBAL ERROR HANDLER ──────────────────────────────────────────
// If any route throws an error, this catches it
// The 4 parameters (err, req, res, next) tell Express this is an error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong on the server' 
  })
})

// ─── START SERVER ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

// First connect to database, THEN start listening for requests
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
    console.log(`📡 API available at http://localhost:${PORT}/api`)
  })
})