const TodoModel = require("../models/todoModel");

const deleteTodoRoute = async (req, res) => {
    const id = req.body.id;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    if (todo.userId != req.user.id) return res.status(403).json({ error: 'Not authorized' });
    await TodoModel.findByIdAndDelete(id);
    res.sendStatus(204);
}

module.exports = deleteTodoRoute;
