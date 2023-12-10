const TodoModel = require('../models/todoModel');

const readTodosRoute = async (req, res) => {
    const todos = await TodoModel.find({ userId: req.user.id });
    res.json(todos);
}

module.exports = readTodosRoute;
