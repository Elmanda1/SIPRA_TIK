import { useState } from 'react'
import '../landing_css/style.css' // <-- Import your CSS file here

function login() {
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
   <div class="containerlogin">
        <h1>SIPRATIK</h1>
        <div>
            <form>
                <input type="text" id="username" name="username" placeholder="username" required/>
                <br/>
                <input type="password" id="password" name="password" placeholder="Password" required/>
                <br/>
                <a href="/forgot-password" class="forgot-link">Forgot password</a>
                <div>
                    <button type="submit" class="button">Login</button>
                    <button type="button" class="button secondary">Login with SSO</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default login