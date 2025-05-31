import React, { useState } from 'react';
import './login.css';
import loginImage from './assets/login-image.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${username}!`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#646cff">
              <circle cx="12" cy="12" r="10" fill="#646cff" opacity="0.15"/>
              <path d="M12 6v6l4 2" stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-desc">Please login to your account</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
            <div className="login-footer">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
          </form>
        </div>
        <div className="login-image-section">
          <img
            src={loginImage}
            alt="Login Visual"
            className="login-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
