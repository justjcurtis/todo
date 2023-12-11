const jwt = require('jsonwebtoken');

const createToken = (payload, secret, expiresIn) => {
    try {
        const token = jwt.sign(payload, secret, { expiresIn });
        return token;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const verifyToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const setTokens = async (user, res, accessToken, refreshToken, csrf) => {
    user.refreshToken = refreshToken;
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: process.env.JWT_EXPIRES_IN
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN
    })
    if (csrf) user.csrf = csrf
    await user.save();
}

module.exports = {
    setTokens,
    verifyToken,
    createToken
}
