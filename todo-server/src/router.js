const express = require('express');
const router = express.Router();
const routes = require('./routes');
const middleware = require('./middleware');

router.get('/todos', middleware.isAuthorized, routes.readTodosRoute);
router.post('/todos', middleware.isAuthorized, routes.createTodoRoute);
router.patch('/todos', middleware.isAuthorized, routes.updateTodoRoute);
router.delete('/todos', middleware.isAuthorized, routes.deleteTodoRoute);

router.post('/login', routes.loginRoute);
router.post('/signup', routes.createUserRoute);

module.exports = router;
