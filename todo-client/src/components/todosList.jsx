import { debounce } from '../utils/debounce';
import { useTodos } from '../hooks/useTodos';
import { NewTodo } from './newTodo';
import { Todo } from './todo';

export const TodosList = ({ page }) => {
    if (page < 1) page = 1
    const {
        todos,
        createTodo,
        fetchTodos,
        updateTodo,
        deleteTodo,
        currentPage,
        maxPages
    } = useTodos(page);
    const handleSearch = (e) => {
        fetchTodos(currentPage, e.target.value.toLowerCase())
    }


    const handlePageChange = async (newPage) => {
        // little bit gross but this make sure the url is updated
        // without having to refresh the page
        window.history.pushState({}, '', `/#/${newPage}`);
        await fetchTodos(newPage);
    }

    return (
        <div className='flex flex-col mx-auto mt-10 pb-10 bg-primary-content max-w-[1080px] pt-16'>
            <div className="flex flex-col justify-center mx-5">
                <input onChange={debounce(handleSearch, 500)} type="text" placeholder="Search todos" className="input input-bordered w-full mb-5" />
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
            <div className="flex justify-center">
                <div className="join">
                    {Array.from(Array(maxPages).keys()).map((_, i) => (
                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}>{i + 1}</button>
                    ))}
                </div>
            </div >
        </div >
    )
}  
