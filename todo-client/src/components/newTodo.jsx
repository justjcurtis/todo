import { useEffect, useState } from 'react'
const buttonPostAnimationClasses = 'rotate-[405deg] bg-secondary'
export const NewTodo = ({ onCreate }) => {
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)
    const [buttonClasses, setButtonClasses] = useState('')
    const styles = {
        buttonStyle: {
            transition: 'transform 0.8s ease-in-out, background-color 0.2s ease-in-out'
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setButtonClasses(buttonPostAnimationClasses)
        }, 300)
    }, [])

    const handleAddPressed = () => {
        onCreate({ text, completed })
        setButtonClasses('')
        setTimeout(() => {
            setButtonClasses(buttonPostAnimationClasses)
        }, 850)
        setText('')
        setCompleted(false)
    }

    return (
        <div className='flex'>
            <input onChange={() => setCompleted(!completed)} type="checkbox" checked={completed ? "checked" : ""} className="checkbox checkbox-accent my-auto" />
            <input onChange={(e) => setText(e.target.value)} value={text} type="text" className="input input-bordered w-full mx-5 my-1" />
            <button onClick={handleAddPressed} style={styles.buttonStyle} className={`btn btn-circle my-auto text-secondary-content bg-accent hover:bg-accent ${buttonClasses}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    )
}
