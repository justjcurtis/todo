const todosRoute = (req, res) => {
    res.json({ todos: ['create todo app', 'submit todo app'] });
}

module.exports = todosRoute;
