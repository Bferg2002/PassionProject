// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

function Login({ onSuccessfulLogin }) {
  // Explicit tracking states for our inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // This handles state management when typing inside input elements
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // Prevents the browser from reloading the page and passes control back up to App.jsx
  function handleSubmitForm(event) {
    event.preventDefault();
    
    // For V1 (frontend testing), clicking submit log in automatically
    onSuccessfulLogin();
  }

  return (
    <div className="login-screen-container">
      <div className="login-card">
        
        <div className="login-header-group">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="#059669">
            <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2zm1 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1 12c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
          </svg>
          <h2 className="login-logo-title">ShellSchedule</h2>
          <p className="login-subtitle">Sign in to manage your chelonian care</p>
        </div>

        <form onSubmit={handleSubmitForm} className="login-form-group">
          <div>
            <label className="login-input-label">Username</label>
            <input 
              type="text" 
              className="login-input-field" 
              placeholder="Enter your keeper profile username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>

          <div>
            <label className="login-input-label">Password</label>
            <input 
              type="password" 
              className="login-input-field" 
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;