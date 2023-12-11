const TodoModel = require('../models/todoModel');

const createTodoRoute = async (req, res) => {
    const userId = req.user.id;
    const text = req.body.text;
    const completed = req.body.completed;
    const todo = new TodoModel({ userId, text, completed });
    await todo.save();
    console.log('create', todo);
    res.json(todo);
}

module.exports = createTodoRoute;
