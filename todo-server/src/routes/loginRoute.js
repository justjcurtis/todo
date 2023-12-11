const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { compare } = require('../utils/passwords')

const rejectLoginRoute = (req, res) => {
    res.status(400).json({ error: 'Invalid username and/or password' });
}

const loginRoute = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) return res.status(400).json({ error: 'Missing username and/or password' });
    const user = await UserModel.findOne({ username })
    if (!user) return rejectLoginRoute(req, res);
    const valid = await compare(password, user.hash);
    if (!valid) return rejectLoginRoute(req, res);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    })
    res.sendStatus(200);
}

module.exports = loginRoute;
