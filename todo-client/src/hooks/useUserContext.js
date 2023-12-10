import { UserContext } from '../contexts/userContext'
import { useContext } from 'react'
export const useUserContext = () => {
    const userContext = useContext(UserContext)
    return userContext
}
