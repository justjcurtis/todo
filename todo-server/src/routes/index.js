const createTodoRoute = require('./createTodoRoute')
const readTodosRoute = require('./readTodosRoute')
const updateTodoRoute = require('./updateTodoRoute')
const deleteTodoRoute = require('./deleteTodoRoute')

const createUserRoute = require('./createUserRoute')
const loginRoute = require('./loginRoute')

module.exports = {
    createTodoRoute,
    readTodosRoute,
    updateTodoRoute,
    deleteTodoRoute,

    createUserRoute,
    loginRoute
}
