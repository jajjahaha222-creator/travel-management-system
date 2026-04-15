// models/User.js
// This defines what a "User" looks like in our database
// Think of it as a template/blueprint for user data

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Schema = the shape/structure of our data
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],  // Can't create user without name
      trim: true  // Remove extra spaces automatically
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,  // No two users can have the same email
      lowercase: true,  // Store email in lowercase always
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false 
    },
    role: {
      type: String,
      enum: ['user', 'admin'],  // Only these two values are allowed
      default: 'user'  // Default is regular user
    }
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true
  }
)

// ─── MIDDLEWARE (Pre-save Hook) ──────────────────────────────────────
// This function runs AUTOMATICALLY before saving a user to the database
// It hashes the password so we never store plain text passwords
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  this.password = await bcrypt.hash(this.password, 12)
})

// ─── INSTANCE METHOD ────────────────────────────────────────────────
// We can add custom methods to our User model
// This method checks if a given password matches the stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt.compare() compares plain text with hash — returns true or false
  return await bcrypt.compare(enteredPassword, this.password)
}

// Create the model from the schema
// 'User' → MongoDB will create a collection called 'users' (lowercase, plural)
const User = mongoose.model('User', userSchema)

module.exports = User   