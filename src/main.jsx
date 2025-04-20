import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contextComponent/AuthContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './Style/Style.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
)
