const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const rejectIsAuthorized = (res) => {
    res.status(403).json({ error: 'Invalid token' });
}

const isAuthorized = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return rejectIsAuthorized(res);
        }
        req.user = decoded;
        const user = await UserModel.findById(decoded.id);
        if (!user) return rejectIsAuthorized(res);
        if (user.csrf != req.headers['csrf-token']) return rejectIsAuthorized(res);
        next();
    });
}

module.exports = isAuthorized;
