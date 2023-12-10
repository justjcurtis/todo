const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;
