import { useTodos } from '../hooks/useTodos';
import { Todo } from './todo';

export const TodosList = ({ page }) => {
    if (page < 1) page = 1
    const {
        todos,
        fetchTodos,
        updateTodo,
        deleteTodo,
        currentPage,
        maxPages
    } = useTodos(page);

    const handlePageChange = async (newPage) => {
        // little bit gross but this make sure the url is updated
        // without having to refresh the page
        window.history.pushState({}, '', `/#/${newPage}`);
        await fetchTodos(newPage);
    }

    return (
        <div className='flex flex-col mx-auto mt-10 max-w-[1080px]'>
            <div className="flex flex-col justify-center mx-5">
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
            <div className="flex my-5 justify-center">
                <button className="btn btn-primary">Add Todo</button>
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
