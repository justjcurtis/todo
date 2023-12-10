import { useState } from 'react'
import { checkPassword } from '../utils/password'
import { useUserContext } from '../hooks/useUserContext'

export const Login = () => {
    const { login } = useUserContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const isUsernameValid = username.length >= 3

    const isPasswordValid = checkPassword(password)


    const isValid = isUsernameValid && isPasswordValid

    const [hasError, setHasError] = useState(false)
    const handleSubmit = async () => {
        const result = await login(username, password)
        if (result.message) {
            setHasError(true)
            return
        }
    }
    const styles = {
        errorMessage: {
            opacity: hasError ? 1 : 0,
            transition: 'all 0.5s ease-in-out'
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Get straight back to doing what you (and we) do best. We hope you get plenty tos done today.</p>
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
                            <label className="label"> Don{"'"}t have an account?
                                <a href="#/signup" className="label-text-alt link link-hover">Sign up</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <p style={styles.errorMessage}>Username / Password incorrect</p>
                            <button onClick={handleSubmit} disabled={!isValid} className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
