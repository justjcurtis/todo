import { useUserContext } from '../hooks/useUserContext'

export const Navbar = () => {
    const { isLoggedIn, logout } = useUserContext()
    const showLogin = !isLoggedIn()
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">ToDos</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {showLogin && <li><a href="/#/login">Login / Sign up</a></li>}
                    {!showLogin && <li><a onClick={logout}>Logout</a></li>}

                </ul>
            </div>
        </div>
    )
}
