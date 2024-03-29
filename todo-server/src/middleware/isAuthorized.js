const UserModel = require('../models/userModel');
const { verifyToken, createToken, setTokens } = require('../utils/jwt');
const { getUserById, verifyUserCsrf } = require('../utils/user');

const rejectIsAuthorized = (res) => {
    res.status(403).json({ error: 'Invalid accessToken' });
}

const isAuthorized = async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    const accessTokenDecoded = verifyToken(accessToken, process.env.JWT_SECRET)
    if (!accessTokenDecoded) {
        if (!refreshToken) return rejectIsAuthorized(res);
        const refreshTokenDecoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (refreshTokenDecoded == null) return rejectIsAuthorized(res);
        req.user = refreshTokenDecoded;
        const user = await getUserById(refreshTokenDecoded.id);
        if (!user) return rejectIsAuthorized(res);
        const csrfisValid = verifyUserCsrf(user, req.headers['csrf-token'])
        if (!csrfisValid) return rejectIsAuthorized(res);
        if (user.refreshToken != refreshToken) return rejectIsAuthorized(res);
        const accessToken = createToken({ id: user._id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
        await setTokens(user, res, accessToken, refreshToken);
        req.cookies.accessToken = accessToken;
        next();
    } else {
        req.user = accessTokenDecoded;
        const user = getUserById(accessTokenDecoded.id);
        if (!user) return rejectIsAuthorized(res);
        const csrfisValid = verifyUserCsrf(user, req.headers['csrf-token'])
        if (!csrfisValid) return rejectIsAuthorized(res);
        next();
    }
}

module.exports = isAuthorized;
