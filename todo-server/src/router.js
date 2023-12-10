const express = require('express');
const router = express.Router();
const routes = require('./routes');
const middleware = require('./middleware');

router.get('/todos', middleware.isAuthorized, routes.readTodosRoute);
router.post('/todos', middleware.isAuthorized, routes.createTodoRoute);
router.patch('/todos', middleware.isAuthorized, routes.updateTodoRoute);

router.get('/login', routes.loginRoute);
router.post('/signup', routes.createUserRoute);

module.exports = router;
