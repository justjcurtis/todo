const { randomString } = require("../utils/random");
const { verifyToken } = require("../utils/jwt");
const { getUserById } = require("../utils/user");

const clearCookies = (res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
}
const clearTokens = async (userId) => {
    const user = await getUserById(userId);
    if (user) {
        user.csrf = randomString();
        user.refreshToken = null;
        await user.save();
        return true
    }
    return false;
}
const logoutRoute = async (req, res) => {
    let cleared = false;
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (accessToken) {
        const accessTokenDecoded = verifyToken(accessToken, process.env.JWT_SECRET);
        if (accessTokenDecoded) {
            cleared = await clearTokens(accessTokenDecoded.id);
        }
    }
    if (!cleared && refreshToken) {
        const refreshTokenDecoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (refreshTokenDecoded) {
            cleared = await clearTokens(refreshTokenDecoded.id);
        }
    }
    clearCookies(res);
    res.sendStatus(200);
}

module.exports = logoutRoute;
