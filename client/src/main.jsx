import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './auth/login.jsx' // ubah import ke Login

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login /> {/* tampilkan Login, bukan App */}
  </StrictMode>,
)
