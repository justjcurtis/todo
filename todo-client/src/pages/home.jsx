import { useParams } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { SignUpHero } from '../components/signUpHero'
import { TodosList } from '../components/todosList'
export const Home = () => {
    const { isLoggedIn } = useUserContext()
    const showSignUpCTA = !isLoggedIn()
    const { page } = useParams()
    return (
        <>
            {showSignUpCTA && <SignUpHero />}
            {!showSignUpCTA && <TodosList page={page} />}
        </>
    )
}
