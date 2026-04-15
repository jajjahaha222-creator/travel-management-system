// config/db.js
// This file handles the connection to MongoDB

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // mongoose.connect() returns a Promise, so we await it
    // process.env.MONGO_URI reads from our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI)
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    // If connection fails, log the error and stop the process
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    process.exit(1) // Exit with failure code
  }
}

// Export so server.js can import and use it
module.exports = connectDB