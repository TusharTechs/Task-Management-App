const mongoose = require("mongoose");

// Define a Mongoose schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Username is a required field
  },
  password: {
    type: String,
    required: true, // Password is a required field
  },
});

// Create a Mongoose model for the User schema
const User = mongoose.model("User", userSchema);

// Export the User model to use in other parts of the application
module.exports = User;