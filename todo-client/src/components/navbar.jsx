export const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">ToDos</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/#/login">Login / Sign up</a></li>
                </ul>
            </div>
        </div>
    )
}
