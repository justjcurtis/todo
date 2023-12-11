const logoutRoute = (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
}

module.exports = logoutRoute;
