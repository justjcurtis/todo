const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { compare } = require('../utils/passwords')
const { randomString } = require('../utils/random')

const rejectLoginRoute = (res) => {
    res.status(400).json({ error: 'Invalid username and/or password' });
}

const loginRoute = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) return res.status(400).json({ error: 'Missing username and/or password' });
    const user = await UserModel.findOne({ username })
    if (!user) return rejectLoginRoute(res);
    const valid = await compare(password, user.hash);
    if (!valid) return rejectLoginRoute(res);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const csrf = randomString();
    user.csrf = csrf;
    await user.save();
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    })
    res.status(200).json({ csrf })
}

module.exports = loginRoute;
