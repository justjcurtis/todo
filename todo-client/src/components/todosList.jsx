import { useTodos } from '../hooks/useTodos';
import { Todo } from './todo';

export const TodosList = () => {
    const { todos, fetchTodos, currentPage, maxPages } = useTodos();
    return (
        <div className='flex flex-col mx-auto mt-10 max-w-[1080px]'>
            <div className="flex flex-col justify-center mx-5">
                {todos.map((todo, i) => (
                    <Todo key={i} text={todo.text} completed={todo.completed} />
                ))}
            </div>
            <div className="flex my-5 justify-center">
                <button className="btn btn-primary">Add Todo</button>
            </div>
            <div className="flex justify-center">
                <div className="join">
                    {Array.from(Array(maxPages).keys()).map((_, i) => (
                        <button key={i} onClick={() => fetchTodos(i + 1)} className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}>{i + 1}</button>
                    ))}
                </div>
            </div >
        </div >
    )
}  
