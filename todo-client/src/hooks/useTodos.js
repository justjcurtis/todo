import { useEffect, useState } from 'react';
import { useUserContext } from './useUserContext';
import { getTodosRequest } from '../api/getTodosRequest'
import { deleteTodoRequest } from '../api/deleteTodoRequest'
import { updateTodoRequest } from '../api/updateTodoRequest';
import { createTodoRequest } from '../api/createTodoRequest';

const limit = 10;

export const useTodos = (initialPage = 1) => {
  const { isLoggedIn, logout } = useUserContext();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchTodos = async (page = 1, search, completedFilter) => {
    if (!isLoggedIn) {
      return;
    }
    setLoading(true);
    try {
      const result = await getTodosRequest(page, limit, search, completedFilter);
      setTodos(result.todos)
      setMaxPages(Math.ceil(result.totalCount / limit))
      setCurrentPage(page);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }

  const deleteTodo = async (id) => {
    if (!isLoggedIn) {
      return;
    }
    setLoading(true);
    try {
      await deleteTodoRequest(id);
      await fetchTodos(currentPage);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }

  const updateTodo = async (id, todo) => {
    if (!isLoggedIn) {
      return;
    }
    setLoading(true);
    try {
      await updateTodoRequest(id, todo);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }

  const createTodo = async (todo) => {
    if (!isLoggedIn) {
      return;
    }
    setLoading(true);
    try {
      await createTodoRequest(todo);
      await fetchTodos(currentPage);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos(initialPage);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { todos, loading, createTodo, fetchTodos, updateTodo, deleteTodo, maxPages, currentPage };
}

