const Todo = require("../models/Todo");

// Get all todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const { task_name } = req.body;
        const todo = new Todo({ task_name });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: "Error creating todo" });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await Todo.findByIdAndUpdate(id, { completed });
        res.json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error updating todo" });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting todo" });
    }
};
