import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

// Define the Login component
const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user login
  const handleLogin = async () => {
    // Send a POST request to the authentication endpoint with user credentials
    const response = await fetch("https://task-management-app-beige-pi.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    // Parse the response data
    const data = await response.json();

    // Check if a token is received in the response
    if (data.token) {
      // Store the token in local storage and redirect to the todos page
      localStorage.setItem("token", data.token);
      window.location = "/todos";
    } else {
      // Display an alert for invalid credentials
      alert("Invalid credentials");
    }
  };

  // Render the login form
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
          <Typography variant="h5">Login</Typography>
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
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            New here?{" "}
            <Link to="/signup" style={{ marginBottom: "10px" }}>
              Signup
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
