import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const TodoForm = ({ fetchTodos }) => {
    const [task, setTask] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.trim()) return;
        await axios.post("http://localhost:5000/api/todos", { task_name: task });
        setTask("");
        fetchTodos();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
            <TextField
                label="New Task"
                variant="outlined"
                fullWidth
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Add
            </Button>
        </form>
    );
};

export default TodoForm;
