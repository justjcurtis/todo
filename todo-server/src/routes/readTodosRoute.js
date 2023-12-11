const TodoModel = require('../models/todoModel');

const readTodosRoute = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    if (page < 1) return res.status(400).json({ error: 'Invalid page number' });
    if (limit < 1) return res.status(400).json({ error: 'Invalid limit number' });
    const skip = (page - 1) * limit;
    const query = TodoModel.find({ userId: req.user.id }).sort({ $natural: -1 })
    query.skip(skip).limit(limit);
    const countQuery = await TodoModel.countDocuments({ userId: req.user.id });
    const todos = await query;
    res.json({ todos, totalCount: countQuery });
}

module.exports = readTodosRoute;
