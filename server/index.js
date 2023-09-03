const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const dbConnect = require("./db/dbConnect");
const dotenv = require("dotenv");

const app = express();

dotenv.config(); // Load environment variables from a .env file

const port = process.env.PORT; // Get the port from environment variables

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use("/auth", authRoutes); // Use authentication routes at "/auth"
app.use("/todo", todoRoutes); // Use todo-related routes at "/todo"

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`); // Log when the app starts listening
  dbConnect(); // Connect to the database when the app starts
});
