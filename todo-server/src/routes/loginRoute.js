const jwt = require('jsonwebtoken');
const loginRoute = (req, res) => {
    const token = jwt.sign({ id: 'someuser' }, process.env.JWT_SECRET);
    res.json({ token });
}

module.exports = loginRoute;
