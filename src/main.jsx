import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MoviesProvider } from './context/MoviesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MoviesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MoviesProvider>
  </StrictMode>,
)
