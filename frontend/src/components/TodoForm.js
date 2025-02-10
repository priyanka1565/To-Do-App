import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoForm = ({ fetchTodos }) => {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;
        
        try {
            await axios.post("http://localhost:5000/api/todos/create_todos", { task_name: taskName });
            setTaskName("");
            fetchTodos();
            toast.success("ToDo Added Succesfully!!!")
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div>
            <ToastContainer/>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField 
                label="New Task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                fullWidth
                required
            />
            <Button type="submit" variant="contained" color="primary">Add ToDo</Button>
        </Box>
        </div>
    );
};

export default TodoForm;