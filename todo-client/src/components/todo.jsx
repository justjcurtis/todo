import { useRef, useState } from 'react'
import { debounce } from '../utils/debounce'
export const Todo = ({ text, completed, onChange, onDelete }) => {
    const [currentText, setCurrentText] = useState(text)
    const [currentCompleted, setCurrentCompleted] = useState(completed)

    const updateWithDebounce = useRef(debounce((newText, newCompleted) => {
        onChange(newText, newCompleted)
    }, 500))

    const handleCompletedChange = () => {
        setCurrentCompleted(!currentCompleted)
        updateWithDebounce.current(currentText, !currentCompleted)
    }

    const handleOnTextChanged = (e) => {
        setCurrentText(e.target.value)
        updateWithDebounce.current(e.target.value, currentCompleted)
    }

    return (
        <div className='flex'>
            <input onClick={handleCompletedChange} type="checkbox" defaultChecked={completed ? "checked" : ""} className="checkbox checkbox-accent my-auto" />
            <input onChange={handleOnTextChanged} value={currentText} type="text" className="input input-bordered w-full mx-5 my-1" />
            <button onClick={onDelete} className="btn btn-circle my-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    )
}
