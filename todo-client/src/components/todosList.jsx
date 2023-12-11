import { useState, useRef } from 'react';
import { debounce } from '../utils/debounce';
import { useTodos } from '../hooks/useTodos';
import { NewTodo } from './newTodo';
import { Todo } from './todo';

const filterMap = {
    undefined: { name: 'All', nextFilter: true },
    true: { name: 'Completed', nextFilter: false },
    false: { name: 'Incomplete', nextFilter: undefined }
}

const getSearchPage = (search, currentPage) => search.length > 0 ? 1 : currentPage

export const TodosList = ({ page }) => {
    const {
        todos,
        createTodo,
        fetchTodos,
        updateTodo,
        deleteTodo,
        currentPage,
        maxPages
    } = useTodos(page);

    const [userPage, setUserPage] = useState(page)

    const [filter, setFilter] = useState()
    const cycleFilter = async () => {
        const nextFilter = filterMap[filter].nextFilter
        setFilter(nextFilter)
        const search = searchInputRef.current.value.toLowerCase()
        const searchPage = getSearchPage(search, userPage)
        await fetchTodos(searchPage, search, nextFilter)
    }

    const searchInputRef = useRef(null);
    const handleSearch = async (e) => {
        const search = e.target.value.toLowerCase()
        const searchPage = getSearchPage(search, userPage)
        await fetchTodos(searchPage, search, filter)
    }

    const handlePageChange = async (newPage) => {
        // little bit gross but this make sure the url is updated
        // without having to refresh the page
        window.history.pushState({}, '', `/#/${newPage}`);
        await fetchTodos(newPage);
    }

    const showPagination = searchInputRef.current?.value.length === 0
    if (showPagination && userPage !== currentPage) {
        setUserPage(currentPage)
    }
    return (
        <div className='flex flex-col mx-auto mt-5 bg-primary-content max-w-[1080px] pt-16'>
            <div className="flex flex-col justify-center mx-5">
                <div className='flex mb-4'>
                    <button onClick={cycleFilter} className='btn w-24 mr-5'>{filterMap[filter].name}</button>
                    <input ref={searchInputRef} onChange={debounce(handleSearch, 500)} type="text" placeholder="Search todos" className="input input-bordered w-full" />
                </div>
                <NewTodo onCreate={createTodo} />
                {todos.map(todo => (
                    <Todo
                        key={todo._id}
                        text={todo.text}
                        completed={todo.completed}
                        onChange={(text, completed) => updateTodo(
                            todo._id,
                            { text, completed }
                        )}
                        onDelete={() => deleteTodo(todo._id)}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-3">
                <div className="join">
                    {showPagination && Array.from(Array(maxPages).keys()).map((_, i) => (
                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`join-item btn ${userPage == i + 1 ? 'btn-active' : ''}`}>{i + 1}</button>
                    ))}
                </div>
            </div >
        </div >
    )
}  
