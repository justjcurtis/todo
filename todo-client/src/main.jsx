import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom';
import { UserProvider } from './contexts/userContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </UserProvider>
  </React.StrictMode>,
)
