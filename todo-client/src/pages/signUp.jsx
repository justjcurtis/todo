import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { checkPassword } from '../utils/password'
import { InfoCard } from '../components/infoCard'
import { signupRequest } from '../api/signupRequest'

const messages = {
    default: 'Please make sure your username is at least 3 characters and that your password meets the critera shown',
    usernameTaken: 'Username already taken',
}

export const SignUp = () => {
    const { isLoggedIn } = useUserContext()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const isUsernameValid = username.length >= 3

    const isPasswordValid = checkPassword(password)

    const isConfirmValid = passwordConfirm === password

    const isValid = isUsernameValid && isPasswordValid && isConfirmValid

    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signupRequest(username, password)
        } catch (error) {
            if (error.message.includes('Username')) {
                setErrorMessage(messages.usernameTaken)
            } else {
                setErrorMessage(messages.default)
            }
            setHasError(true)
            return
        }
    }

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/')
        }
    }, [navigate, isLoggedIn])

    const styles = {
        errorMessage: {
            opacity: hasError ? 1 : 0,
            transition: 'all 0.5s ease-in-out'
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex flex-col'>
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        <p className="py-6">Our state of the art do and to algorithm is a must have in today{"'"}s fast paced world. Sign up now to start doing all those tos.</p>
                    </div>
                    <InfoCard title="About your password" info={[
                        "Must be at least 8 characters long",
                        "Must contain at least 2 lowercase letters",
                        "Must contain at least 2 uppercase letters",
                        "Must contain at least 2 numbers",
                        "Must contain at least 1 special character",
                    ]} />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <span className="label-text">Password Confirmation</span>
                            </label>
                            <input onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="password again" className="input input-bordered" required />
                            <label className="label"> Already have an account?
                                <a href="#/login" className="label-text-alt link link-hover">Login</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <p style={styles.errorMessage}>{errorMessage}</p>
                            <button onClick={handleSubmit} disabled={!isValid} className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
