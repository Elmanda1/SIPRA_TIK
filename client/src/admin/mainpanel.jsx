import { useState } from 'react'
import '../admincss_css/style.css' 

function mainpanel() {
  const [email, setEmail] = useState('')
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = (e) => {
  e.preventDefault()
  
  // Validate the email
  if (!email) {
    alert('Please enter an email')
    return
  }
  
  // Send request to your server
  fetch('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
  
  // Show success message
  alert('Reset link sent!')
}

  return (
    <div class="mainpanel">
            <h1>Reset Password </h1>
        <div class="kotak">
                <h2>Menunggu Validasi</h2>
                <h2>50</h2>
        </div>
        <div class="kotak">
                <h2>Pinjaman Aktif</h2>
                <h2>50</h2>
        </div>
        <div class="kotak">
                <h2>Peminjaman Selesai</h2>
                <h2>50</h2>
        </div>
    </div>
    
  )
}

export default mainpanel