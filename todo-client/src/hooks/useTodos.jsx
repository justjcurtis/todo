import { useEffect, useState } from 'react';
import { useUserContext } from './useUserContext';
import { getTodosRequest } from '../api/getTodosRequest'
import { deleteTodoRequest } from '../api/deleteTodoRequest'

export const useTodos = () => {
  const { token, isLoggedIn } = useUserContext();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(-1);

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
      await fetchTodos();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { todos, loading, fetchTodos, deleteTodo, maxPages, currentPage };
}

