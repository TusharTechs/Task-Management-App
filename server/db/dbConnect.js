const mongoose = require("mongoose");

// Function to establish a connection to the MongoDB database
function connectDB() {
  // Get the database connection URL from the environment variables
  const DB_URL = process.env.MONGO_URI;

  // Connect to the MongoDB database using Mongoose
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,       // Use the new URL parser
    useUnifiedTopology: true,    // Use the new server discovery and monitoring engine
  });

  const db = mongoose.connection;

  // Event handler for connection errors
  db.on("error", console.error.bind(console, "Connection error: "));

  // Event handler for a successful database connection
  db.once("open", function () {
    console.log("DB connected..."); // Log a success message when connected
  });
}

// Export the connectDB function to be used elsewhere in the application
module.exports = connectDB;