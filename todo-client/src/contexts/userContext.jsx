import { useState } from 'react'
import { createContext } from 'react'
import { loginRequest } from '../api/loginRequest'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const isLoggedIn = () => !!token
  const login = async (email, password) => {
    try {
      const result = await loginRequest(email, password)
      setToken(result.token)
      localStorage.setItem('token', token)
      return result
    } catch (err) {
      return err
    }
  }
  const logout = () => {
    setToken(null)
  }
  return (
    <UserContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
