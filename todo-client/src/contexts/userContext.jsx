import { useState } from 'react'
import { createContext } from 'react'
import { loginRequest } from '../api/loginRequest'
import { logoutRequest } from '../api/logoutRequest'
import axios from 'axios'

export const UserContext = createContext()

axios.defaults.withCredentials = true
const updateCsrf = (csrf) => {
  axios.defaults.headers['csrf-token'] = csrf
}

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))
  const login = async (email, password) => {
    try {
      const { csrf } = await loginRequest(email, password)
      updateCsrf(csrf)
      localStorage.setItem('isLoggedIn', true)
      setIsLoggedIn(true)
    } catch (err) {
      setIsLoggedIn(false)
    }
  }
  const logout = async () => {
    await logoutRequest()
    updateCsrf('')
    localStorage.setItem('isLoggedIn', false)
    setIsLoggedIn(false)
  }
  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
