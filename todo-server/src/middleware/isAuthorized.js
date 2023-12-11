const UserModel = require('../models/userModel');
const { verifyToken, createToken, setTokens } = require('../utils/jwt');
const { getUserById, verifyUserCsrf } = require('../utils/user');

const rejectIsAuthorized = (res) => {
    res.status(403).json({ error: 'Invalid accessToken' });
}

const isAuthorized = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken) {
        return res.status(401).json({ error: 'No accessToken provided' });
    }

    const accessTokenDecoded = verifyToken(accessToken, process.env.JWT_SECRET)
    if (accessTokenDecoded == null) {
        if (!refreshToken) return rejectIsAuthorized(res);
        const refreshTokenDecoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (refreshTokenDecoded == null) return rejectIsAuthorized(res);
        req.user = refreshTokenDecoded;
        const user = getUserById(refreshTokenDecoded.id);
        if (!user) return rejectIsAuthorized(res);
        const csrfisValid = verifyUserCsrf(user, req.headers['csrf-token'])
        if (!csrfisValid) return rejectIsAuthorized(res);
        if (user.refreshToken != refreshToken) return rejectIsAuthorized(res);
        createToken({ id: refreshTokenDecoded.id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
        setTokens(res, accessToken, refreshToken);
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
