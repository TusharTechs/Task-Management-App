import { useState, useEffect } from "react";
import { authState } from "../store/authState.js";
import { useRecoilValue } from "recoil";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Logout,
  CheckCircleOutline,
  RadioButtonUnchecked,
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";

// Define the TodoList component
const TodoList = () => {
  // State variables for todos, title, description, and editing state
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const authStateValue = useRecoilValue(authState);

  // Fetch todos from the server on component mount
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/todo/todos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setTodos(data);
    };
    getTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async () => {
    const response = await fetch("http://localhost:3000/todo/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    setTodos([...todos, data]);
  };

  // Function to toggle the state of a todo (done/doing)
  const toggleTodoState = async (id, currentState) => {
    const newState = currentState === "done" ? "doing" : "done";
    const response = await fetch(
      `http://localhost:3000/todo/todos/${id}/${newState}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const updatedTodo = await response.json();
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function to save changes to a todo
  const saveTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      });

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id
              ? {
                  ...todo,
                  title: updatedTitle,
                  description: updatedDescription,
                }
              : todo
          )
        );

        setEditingTodoId(null);
      } else {
        console.error("Failed to save todo");
      }
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Render the TodoList component
  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h2">
            Welcome {authStateValue.username}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} align="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              localStorage.removeItem("token");
              window.location = "/login";
            }}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h2">Todo List</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            startIcon={<Add />}
          >
            Add Todo
          </Button>
        </Grid>
      </Grid>

      {todos.map((todo) => (
        <Paper
          elevation={3}
          key={todo._id}
          style={{ padding: "16px", marginTop: "16px", position: "relative" }}
        >
          {editingTodoId === todo._id ? (
            <div>
              <TextField
                style={{ marginBottom: "10px" }}
                fullWidth
                variant="outlined"
                label="Title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <TextField
                style={{ marginBottom: "10px" }}
                fullWidth
                variant="outlined"
                label="Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => saveTodo(todo._id)}
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <Typography variant="h5">{todo.title}</Typography>
              <Typography variant="body1">{todo.description}</Typography>
              <IconButton
                onClick={() =>
                  toggleTodoState(todo._id, todo.done ? "done" : "doing")
                }
                style={{ position: "absolute", top: "16px", right: "72px" }}
              >
                {todo.done ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
              </IconButton>
              <IconButton
                onClick={() => {
                  setEditingTodoId(todo._id);
                  setUpdatedTitle(todo.title);
                  setUpdatedDescription(todo.description);
                }}
                style={{ position: "absolute", top: "16px", right: "40px" }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => deleteTodo(todo._id)}
                style={{ position: "absolute", top: "16px", right: "8px" }}
              >
                <Delete />
              </IconButton>
            </div>
          )}
        </Paper>
      ))}
    </div>
  );
};

export default TodoList;
