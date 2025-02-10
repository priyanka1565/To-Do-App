const express = require("express");
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todoController");

router.get("/get_all_todos", getTodos);
router.post("/create_todos", createTodo);
router.put("/update_todos/:id", updateTodo);
router.delete("/delete_todos/:id", deleteTodo);
module.exports = router;
