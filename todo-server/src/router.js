const express = require('express');
const router = express.Router();
const routes = require('./routes');
const middleware = require('./middleware');

router.post('/getTodos', middleware.isAuthorized, routes.readTodosRoute);
router.post('/todo', middleware.isAuthorized, routes.createTodoRoute);
router.patch('/todo', middleware.isAuthorized, routes.updateTodoRoute);
router.delete('/todo', middleware.isAuthorized, routes.deleteTodoRoute);

router.post('/login', routes.loginRoute);
router.post('/signup', routes.createUserRoute);

module.exports = router;
