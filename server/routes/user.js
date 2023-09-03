const jwt = require("jsonwebtoken");
const express = require("express");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const User = require("../models/userModel");
const { z } = require("zod");

// Define input schema for user signup
const signupInput = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(6).max(20),
});

const router = express.Router();

// User registration route
router.post("/signup", async (req, res) => {
  // Parse and validate user input
  let parsedInput = signupInput.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(403).json({
      msg: "error",
    });
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;

  // Check if the user already exists
  const user = await User.findOne({ username: parsedInput.data.username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    // Create a new user and generate a JWT token
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  }
});

// User login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Find the user by username and password
  const user = await User.findOne({ username, password });
  if (user) {
    // Generate a JWT token for successful login
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

// Retrieve user profile route
router.get("/me", authenticateJwt, async (req, res) => {
  // Fetch the user profile based on the authenticated user's ID
  const user = await User.findOne({ _id: req.userId });
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: "User not logged in" });
  }
});

module.exports = router;
