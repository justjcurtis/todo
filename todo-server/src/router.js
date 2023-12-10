const express = require('express');
const router = express.Router();
const routes = require('./routes');
const middleware = require('./middleware');

router.get('/todos', middleware.isAuthorized, routes.todosRoute);
router.get('/login', routes.loginRoute);

module.exports = router;
