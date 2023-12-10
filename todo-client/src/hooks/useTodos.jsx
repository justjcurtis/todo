import { useEffect, useState } from 'react';
import { useUserContext } from './useUserContext';
import { getTodosRequest } from '../api/getTodosRequest'
import { deleteTodoRequest } from '../api/deleteTodoRequest'
import { updateTodoRequest } from '../api/updateTodoRequest';

export const useTodos = (initialPage = 1) => {
  const { token, isLoggedIn } = useUserContext();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchTodos = async (page = 1, limit = 10) => {
    if (!isLoggedIn()) {
      return;
    }
    setLoading(true);
    try {
      const result = await getTodosRequest(page, limit, token);
      setTodos(result.todos);
      setMaxPages(Math.ceil(result.totalCount / limit))
      setCurrentPage(page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const deleteTodo = async (id) => {
    if (!isLoggedIn()) {
      return;
    }
    setLoading(true);
    try {
      await deleteTodoRequest(id, token);
      await fetchTodos(currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const updateTodo = async (id, todo) => {
    if (!isLoggedIn()) {
      return;
    }
    setLoading(true);
    try {
      await updateTodoRequest(id, token, todo);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos(initialPage);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { todos, loading, fetchTodos, updateTodo, deleteTodo, maxPages, currentPage };
}

