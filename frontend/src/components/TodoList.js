import React, { useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Checkbox,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const TodoList = ({ todos, fetchTodos }) => {
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    // Toggle completed status
    const handleToggle = async (id, completed) => {
        await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
        fetchTodos();
    };

    // Start editing a task
    const handleEdit = (id, task_name) => {
        setEditId(id);
        setEditText(task_name);
    };

    // Save the edited task
    const handleSave = async (id) => {
        if (editText.trim() === "") return;
        await axios.put(`http://localhost:5000/api/todos/${id}`, { task_name: editText });
        setEditId(null);
        fetchTodos();
    };

    // Delete a task
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        fetchTodos();
    };

    return (
        <List>
            {todos.map((todo) => (
                <ListItem key={todo._id} divider>
                    {/* Checkbox for completion */}
                    <Checkbox checked={todo.completed} onChange={() => handleToggle(todo._id, todo.completed)} />

                    {/* Edit Mode: Show Input Field */}
                    {editId === todo._id ? (
                        <TextField
                            variant="outlined"
                            size="small"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={{ marginRight: "10px", flex: 1 }}
                        />
                    ) : (
                        <ListItemText
                            primary={todo.task_name}
                            style={{ textDecoration: todo.completed ? "line-through" : "none", flex: 1 }}
                        />
                    )}

                    {/* Edit / Save Button */}
                    <IconButton onClick={() => (editId === todo._id ? handleSave(todo._id) : handleEdit(todo._id, todo.task_name))} color="primary">
                        {editId === todo._id ? <SaveIcon /> : <EditIcon />}
                    </IconButton>

                    {/* Delete Button */}
                    <IconButton onClick={() => handleDelete(todo._id)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default TodoList;
