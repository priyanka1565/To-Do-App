import React, { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:5000/api/todos/get_all_todos");
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h4" gutterBottom>
          To-Do List
        </Typography>
        <TodoForm fetchTodos={fetchTodos} />
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      </Paper>
    </Container>
  );
};

export default App;
