import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TodoList from "./Components/TodoList";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "./store/authState.js";

// Main App component
function App() {
  return (
    <RecoilRoot>
      <Router>
        <InitState /> {/* Initialize authentication state */}
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/signup" element={<Signup />} /> {/* Signup route */}
          <Route path="/todos" element={<TodoList />} /> {/* TodoList route */}
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

// InitState component for initializing authentication state
function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  // Function to initialize authentication state based on stored token
  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://task-management-server-1jug.onrender.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.username) {
        setAuth({ token: data.token, username: data.username });
        navigate("/todos"); // Redirect to the Todos page if authenticated
      } else {
        navigate("/login"); // Redirect to the Login page if not authenticated
      }
    } catch (e) {
      navigate("/login"); // Redirect to the Login page in case of an error
    }
  };

  useEffect(() => {
    init(); // Call the initialization function on component mount
  }, []);

  return <></>; // Render nothing, as this component handles authentication state initialization
}

export default App;
