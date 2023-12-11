import { useState } from 'react'
import { createContext } from 'react'
import { loginRequest } from '../api/loginRequest'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = async (email, password) => {
    try {
      await loginRequest(email, password)
      setIsLoggedIn(true)
    } catch (err) {
      setIsLoggedIn(false)
    }
  }
  const logout = () => {
    setIsLoggedIn(false)
  }
  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
