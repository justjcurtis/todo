import { useState, useRef } from 'react'
export const Todo = ({ text, completed, onChange, onDelete }) => {
    const [value, setValue] = useState(text)
    const lastValue = useRef(value)
    const handleCompletedChange = () => {
        onChange(value, !completed)
    }
    const handleOnBlur = () => {
        if (value !== lastValue.current) {
            onChange(value)
            lastValue.current = value
        }
    }
    return (
        <div className='flex'>
            <input onClick={handleCompletedChange} type="checkbox" defaultChecked={completed ? "checked" : ""} className="checkbox checkbox-accent my-auto" />
            <input onBlur={handleOnBlur} onChange={(e) => setValue(e.target.value)} value={value} type="text" className="input input-bordered w-full mx-5 my-1" />
            <button onClick={onDelete} className="btn btn-circle my-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    )
}
