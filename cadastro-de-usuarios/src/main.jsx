import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login/login'
import Welcome from './pages/Welcome/welcome'
import Register from './pages/Register/register'

const basename = "/cadastro-de-usuarios"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path="/welcome/:name" element={<Welcome />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  </StrictMode>,
)
