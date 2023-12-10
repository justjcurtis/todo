const UserModel = require('../models/userModel');
const { getHash } = require('../utils/passwords');

const createUserRoute = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing username and/or password' });
    const userExists = await UserModel.exists({ username });
    if (userExists) return res.status(400).json({ error: 'Username already exists' });
    const hash = await getHash(password);
    const user = new UserModel({ username, hash });
    await user.save();
    res.sendStatus(201);
}

module.exports = createUserRoute;
