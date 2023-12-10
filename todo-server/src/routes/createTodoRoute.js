const TodoModel = require('../models/todoModel');

const createTodoRoute = (req, res) => {
    const userId = req.user.id;
    const text = req.body.text;
    if (!text) return res.status(400).json({ error: 'Missing text' })
    const todo = new TodoModel({ userId, text });
    todo.save();
    res.json(todo);
}

module.exports = createTodoRoute;
