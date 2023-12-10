const express = require('express');
const router = express.Router();
const routes = require('./routes');
const middleware = require('./middleware');

router.get('/todos', middleware.isAuthorized, routes.readTodosRoute);
router.post('/todos', middleware.isAuthorized, routes.createTodoRoute);
router.get('/login', routes.loginRoute);

module.exports = router;
