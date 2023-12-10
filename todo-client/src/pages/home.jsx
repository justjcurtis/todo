import { useUserContext } from '../hooks/useUserContext'
import { SignUpHero } from '../components/signUpHero'
export const Home = () => {
    const { isLoggedIn } = useUserContext()
    const showSignUpCTA = !isLoggedIn()
    return (
        <>
            {showSignUpCTA && <SignUpHero />}

        </>
    )
}
