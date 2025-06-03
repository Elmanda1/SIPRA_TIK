import { useState } from 'react'
import '../landing_css/style.css' // <-- Import your CSS file here

function emailme() {
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
    <div class="container">
      <div class="uppercontainer">
        <h1>Reset Password</h1>
        <p>we'll email  you the link to reset your Password</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" class="button">Send The Link</button>
      </form>
    </div>
  )
}

export default emailme