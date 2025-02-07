const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", TodoSchema);
