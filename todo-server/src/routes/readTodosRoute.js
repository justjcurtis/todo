const TodoModel = require('../models/todoModel');

const readTodosRoute = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = req.body.search || '';

    let completedOptions = [
        undefined,
        true,
        false
    ]
    const completedFilter = req.body.completedFilter;
    if (completedFilter != undefined) {
        completedOptions = completedOptions.filter(
            opt => opt === completedFilter
        )
    }

    if (page < 1) return res.status(400).json({ error: 'Invalid page number' });
    if (limit < 1) return res.status(400).json({ error: 'Invalid limit number' });

    const findOptions = {
        userId: req.user.id,
        text: { $regex: search },
        completed: { $in: completedOptions }
    }
    const skip = (page - 1) * limit;
    const query = TodoModel.find(findOptions).sort({ $natural: -1 })
    query.skip(skip).limit(limit);

    const countQuery = await TodoModel.countDocuments(findOptions);

    const todos = await query;

    res.json({ todos, totalCount: countQuery });
}

module.exports = readTodosRoute;
