const TodoModel = require('../models/todoModel');

const updateTodoRoute = async (req, res) => {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const text = req.body.text;
    const completed = req.body.completed;
    if (!text && completed == undefined) return res.status(400).json({ error: 'Missing text and/or completed' });
    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    if (todo.userId != req.user.id) return res.status(403).json({ error: 'Not authorized' });
    if (text != undefined) todo.text = text;
    if (completed != undefined) todo.completed = completed;
    todo.save();
    res.sendStatus(204);
}

module.exports = updateTodoRoute;
