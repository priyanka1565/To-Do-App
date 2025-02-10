const Todo = require("../models/Todo");

// Get all todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ _id: -1 })
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
// Update a todo (task_name or completed)
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task_name, completed } = req.body; // Get task_name and completed from request body

        // Find and update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task_name, completed },  // Update both fields
            { new: true }  // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: "Error updating todo", error });
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
