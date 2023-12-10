const UserModel = require('../models/userModel');
const { getHash } = require('../utils/passwords');

const checkPassword = (password) => {
    const has2Numbers = !!password.match(/[0-9].*[0-9]/);
    const has2Capitals = !!password.match(/[A-Z].*[A-Z]/);
    const has2Lowercase = !!password.match(/[a-z].*[a-z]/);
    const has1Symbol = !password.match(/^[a-zA-Z0-9]*$/);
    const result = has2Numbers && has2Capitals && has2Lowercase && has1Symbol && password.length >= 8;
    console.log(result);
    return result;
}

const createUserRoute = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing username and/or password' });
    if (username.length < 3) return res.status(400).json({ error: 'Username must be at least 3 characters' });
    if (!checkPassword(password)) return res.status(400).json({ error: 'Password must be at least 8 characters with at least 2 numbers, 2 capital letters, 2 lowercase letters and 1 symbol' });
    const userExists = await UserModel.exists({ username });
    if (userExists) return res.status(400).json({ error: 'Username already exists' });
    const hash = await getHash(password);
    const user = new UserModel({ username, hash });
    await user.save();
    res.sendStatus(201);
}

module.exports = createUserRoute;
