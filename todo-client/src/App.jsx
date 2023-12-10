import './App.css'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import { AppRoutes } from './navigation/routes.js'
import { Pages } from './pages'
import { themeChange } from 'theme-change'
import { Navbar } from './components/navbar';

function App() {
  useEffect(() => {
    themeChange(false)
  }, [])
  const location = useLocation()

  return (
    <div className="App bg-primary-content min-h-[100svh]">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route exact path={AppRoutes.home} element={<Pages.Home />} />
        <Route exact path={AppRoutes.about} element={<Pages.About />} />
        <Route exact path={AppRoutes.login} element={<Pages.Login />} />
        <Route exact path={AppRoutes.signup} element={<Pages.SignUp />} />
        <Route path={AppRoutes.notFound} element={<Pages.NotFound />} />
      </Routes>
    </div>
  )
}

export default App
