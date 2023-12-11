const UserModel = require('../models/userModel');
const { compare } = require('../utils/passwords')
const { randomString } = require('../utils/random');
const { createToken, setTokens } = require('../utils/jwt');

const rejectLoginRoute = (res) => {
    res.status(400).json({ error: 'Invalid username and/or password' });
}

const loginRoute = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) return res.status(400).json({ error: 'Missing username and/or password' });
    const user = await UserModel.findOne({ username })
    if (!user) return rejectLoginRoute(res);
    const passwordValid = await compare(password, user.hash);
    if (!passwordValid) return rejectLoginRoute(res);
    const accessToken = createToken({ id: user.id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
    const refreshToken = createToken({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN);
    const csrf = randomString();
    await setTokens(user, res, accessToken, refreshToken, csrf);
    res.status(200).json({ csrf })
}

module.exports = loginRoute;
