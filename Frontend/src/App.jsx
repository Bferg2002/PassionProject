import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav'; 
import Login from './components/Login'; 
import './App.css'; 
import { MdMenu } from 'react-icons/md';

// 1. IMPORT YOUR SEPARATE PAGE COMPONENTS HERE
import Dashboard from './pages/Dashboard';
import MyTortoises from './pages/MyTortoises';
import HealthLogs from './pages/HealthLogs';
import AIAssistant from './pages/AIAssistant';
import ExpenseTracker from './pages/ExpenseTracker';
import AccountSettings from './pages/AccountSettings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  let wrapperClassNames = "main-layout-wrapper";
  if (isOpen === true) {
    wrapperClassNames = "main-layout-wrapper shifted";
  }

  // Unauthenticated view bypasses application structural frames entirely
  if (!isLoggedIn) {
    return <Login onSuccessfulLogin={handleLogin} />;
  }

  // Authenticated layout wrapper
  return (
    <Router>
      <div className={wrapperClassNames}>
        
        {/* Sidebar Nav stays mounted in place across all routes */}
        <Nav isMenuOpen={isOpen} onLogout={handleLogout} />

        <main className="content-inner-padding">
          
          <button className="menu-toggle-icon-btn" onClick={handleToggleMenu}>
            <MdMenu size={24} />
          </button>
          
          {/* THE DASHBOARD WHITE CONTAINER INTERIOR CANVASES */}
          <div className="dashboard-content-card">
            <Routes>
              {/* Default landing redirects straight to dashboard url route */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* 2. PLUG IN THE IMPORTED COMPONENTS CLEANLY */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-tortoises" element={<MyTortoises />} />
              
              {/* Note: This path is set to /health-logs to perfectly match your Nav.jsx link */}
              <Route path="/health-logs" element={<HealthLogs />} />
              
              {/* Note: This path is set to /ai-assistant to perfectly match your Nav.jsx link */}
              <Route path="/ai-assistant" element={<AIAssistant />} />
              
              {/* Note: This path is set to /expense-tracker to perfectly match your Nav.jsx link */}
              <Route path="/expense-tracker" element={<ExpenseTracker />} />
              
              {/* Note: This path is set to /account-settings to perfectly match your Nav.jsx link */}
              <Route path="/account-settings" element={<AccountSettings />} />
            </Routes>
          </div>

        </main>
      </div>
    </Router>
  );
}

export default App;