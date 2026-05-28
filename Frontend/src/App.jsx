// src/App.jsx
import React, { useState } from 'react';
import Nav from './components/Nav'; 
import Login from './components/Login'; 
import './App.css'; 
import { MdMenu } from 'react-icons/md';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  function handleLoginTrigger() {
    setIsLoggedIn(true);
  }

  function handleLogoutTrigger() {
    setIsLoggedIn(false);
    setActiveTab('Dashboard'); // Clear the view focus state back to default
  }

  function handleToggleMenu() {
    if (isOpen === true) {
      setIsOpen(false); 
    } else {
      setIsOpen(true);  
    }
  }

  function handlePageSelection(pageName) {
    setActiveTab(pageName);
  }

  let wrapperClassNames = "main-layout-wrapper";
  if (isOpen === true) {
    wrapperClassNames = "main-layout-wrapper shifted";
  }

  if (isLoggedIn === false) {
    return <Login onSuccessfulLogin={handleLoginTrigger} />;
  }

  return (
    <div className={wrapperClassNames}>
      
      {/* CRITICAL REFACTOR: We add onUserLogout property mapping here.
        This grants Nav.jsx explicit permission to execute handleLogoutTrigger.
      */}
      <Nav 
        isMenuOpen={isOpen} 
        currentPage={activeTab} 
        onPageChange={handlePageSelection} 
        onUserLogout={handleLogoutTrigger}
      />

      <main className="content-inner-padding">
        
        {/* Cleaned layout: The top row now only holds our hamburger control toggle */}
        <button className="menu-toggle-icon-btn" onClick={handleToggleMenu}>
          <MdMenu size={24} />
        </button>
        
        {/* DYNAMIC SCREEN VIEWS SELECTION BLOCK */}
        {activeTab === 'Dashboard' && (
          <header>
            <h1>Dashboard</h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>
              Track your tortoise health, husbandry, and care expenses
            </p>
          </header>
        )}

        {activeTab === 'My Tortoises' && (
          <header>
            <h1>My Tortoises</h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>View profiles and add new reptilian family members</p>
          </header>
        )}

        {activeTab === 'Health Logs' && (
          <header>
            <h1>Health Logs</h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>Log shell measurements and scale weight records</p>
          </header>
        )}

        {activeTab === 'AI Assistant' && (
          <header>
            <h1>Herpetologist AI Assistant</h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>Ask Gemini explicit science-based husbandry questions</p>
          </header>
        )}

        {activeTab === 'Expense Tracker' && (
          <header>
            <h1>Expense Tracker</h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>Manage dietary, enclosure, and medical budget metrics</p>
          </header>
        )}

        {activeTab === 'Account Settings' && (
          <header>
            <h1>Account Settings</h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>Manage profile visibility and sensitive personal data</p>
          </header>
        )}

        <section style={{ marginTop: '32px' }}>
          {/* Component card slots sit here */}
        </section>

      </main>
    </div>
  );
}

export default App;