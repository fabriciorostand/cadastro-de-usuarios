import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login/login'
import Welcome from './pages/Welcome/welcome'
import Register from './pages/Register/register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/welcome/:name" element={<Welcome />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  </StrictMode>,
)
