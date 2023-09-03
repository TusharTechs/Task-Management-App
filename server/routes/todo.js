const express = require("express");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const Todo = require("../models/todoModel");
const router = express.Router();

// Create a new todo
router.post("/todos", authenticateJwt, (req, res) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.userId;

  const newTodo = new Todo({ title, description, done, userId });

  newTodo
    .save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create a new todo" });
    });
});

// Retrieve all todos for the authenticated user
router.get("/todos", authenticateJwt, (req, res) => {
  const userId = req.userId;

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve todos" });
    });
});

// Mark a todo as 'doing'
router.patch("/todos/:todoId/doing", authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.userId;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: false }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update todo" });
    });
});

// Mark a todo as 'done'
router.patch("/todos/:todoId/done", authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.userId;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update todo" });
    });
});

// Update a todo's title and description
router.patch("/todos/:todoId", authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.userId;
  const { title, description } = req.body;

  Todo.findOneAndUpdate(
    { _id: todoId, userId },
    { title, description },
    { new: true }
  )
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update todo" });
    });
});

// Delete a todo
router.delete("/todos/:todoId", authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.userId;

  Todo.findOneAndDelete({ _id: todoId, userId })
    .then((deletedTodo) => {
      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to delete todo" });
    });
});

module.exports = router;
