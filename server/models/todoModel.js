const mongoose = require("mongoose");

// Define a Mongoose schema for the Todo model
const todoSchema = new mongoose.Schema({
  title: String,        // Title of the todo item
  description: String,  // Description of the todo item
  done: Boolean,        // Boolean indicating whether the todo is completed
  userId: String,       // ID of the user associated with the todo
});

// Create a Mongoose model for the Todo schema
const Todo = mongoose.model("Todo", todoSchema);

// Export the Todo model to use in other parts of the application
module.exports = Todo;
