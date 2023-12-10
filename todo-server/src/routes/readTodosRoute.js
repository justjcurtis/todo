const TodoModel = require('../models/todoModel');

const readTodosRoute = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const query = TodoModel.find({ userId: req.user.id });
    query.skip(skip).limit(limit);
    const countQuery = await TodoModel.countDocuments({ userId: req.user.id });
    const todos = await query;
    res.set('X-Total-Count', countQuery);
    res.json(todos);
}

module.exports = readTodosRoute;
