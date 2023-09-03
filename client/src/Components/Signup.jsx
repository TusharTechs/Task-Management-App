import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

// Define the Signup component
const Signup = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Create a navigate function to handle navigation
  const navigate = useNavigate();

  // Function to handle user signup
  const handleSignup = async () => {
    // Send a POST request to the signup endpoint with user credentials
    const response = await fetch("https://task-management-server-1jug.onrender.com/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    // Parse the response data
    const data = await response.json();

    // Check if a token is received in the response
    if (data.token) {
      // Store the token in local storage and navigate to the todos page
      localStorage.setItem("token", data.token);
      navigate("/todos");
    } else {
      // Display an alert for signup errors
      alert("Error while signing up");
    }
  };

  // Render the signup form
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
        <center>
          <LockOutlined color="primary" fontSize="large" />
          <Typography variant="h5">Sign up</Typography>
        </center>
        <form>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" style={{ marginBottom: "10px" }}>
              Already signed up? Login
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
