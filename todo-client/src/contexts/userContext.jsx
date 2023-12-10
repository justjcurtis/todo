import { createContext } from 'react'

export const UserContext = createContext({
  user: null,
  login: (user) => { console.log(user) },
  logout: () => { },
})

export const UserProvider = ({ children }) => {
  const user = null
  const login = (user) => { console.log(user) }
  const logout = () => { }
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
