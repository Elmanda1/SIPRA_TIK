import { useState } from 'react'
import '../landing_css/style.css' // <-- Import your CSS file here

function ForgotPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    // Proceed with password reset logic (e.g., API call)
    // Example:
    // fetch('/reset-password', {
    //   method: 'POST',
    //   body: JSON.stringify({ password }),
    // })

    alert('Password reset successful!')
  }

  return (
    <div className="container">
      <div className="uppercontainer">
        <h1>Reset Password</h1>
      </div>
      <form onSubmit={handleSubmit} id="resetForm">
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your new password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your new password"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="button">Confirm</button>
      </form>
    </div>
  )
}

export default ForgotPassword