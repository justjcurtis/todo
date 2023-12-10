const TodoModel = require('../models/todo');
const readTodosRoute = async (req, res) => {
    const todos = await TodoModel.find();
    res.json(todos);
}

module.exports = readTodosRoute;
