import React, { useState } from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${username}!`);
  };

  return (
    <div className="login-bg">
      <div className="login-center">
        <div className="login-card">
          <h1 className="login-brand">Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="sr-only">Email address</label>
              <input
                id="username"
                type="text"
                placeholder="hello@samuelmay.co"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group password-group">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <div className="forgot-link-wrapper">
                <a href="#" className="forgot-link">FORGOT YOUR PASSWORD?</a>
              </div>
            </div>
            <div className="login-btn-group">
              <button type="submit" className="login-btn">LOG IN</button>
              <button type="button" className="login-btn">SSO</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
