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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = ({ todos, fetchTodos }) => {
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    // Toggle completed status
    const handleToggle = async (id, completed) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/update_todos/${id}`, { completed: !completed });
            console.log("Updated Todo:", response.data);
            toast.success("ToDo Updated Successfully!!!")
            fetchTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    // Start editing a task
    const handleEdit = (id, task_name) => {
        setEditId(id);
        setEditText(task_name);
    };

    // Save the edited task
    const handleSave = async (id) => {
        if (editText.trim() === "") return;
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/update_todos/${id}`, { task_name: editText });
            console.log("Updated Task:", response.data);
            setEditId(null);
            fetchTodos();
            toast.success("ToDo Updated Successfully!!!")
        } catch (error) {
            console.error("Error saving todo:", error);
        }
    };

    // Delete a task
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/delete_todos/${id}`);
            fetchTodos();
            toast.success("ToDo Deleted Successfully!!!")
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div>
            <ToastContainer />
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
        </div>
    );
};

export default TodoList;
