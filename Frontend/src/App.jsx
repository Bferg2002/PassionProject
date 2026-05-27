import React, { useState } from 'react';
import Nav from './components/Nav'; 
import './App.css'; 
import { MdMenu } from 'react-icons/md';

function App() {
  // 1. Manage menu open/close visibility state
  const [isOpen, setIsOpen] = useState(true);
  
  // 2. Manage which tab page is currently active view
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Toggles the sidebar view state
  function handleToggleMenu() {
    if (isOpen === true) {
      setIsOpen(false); 
    } else {
      setIsOpen(true);  
    }
  }

  // Updates the active tab screen state when clicked from the Nav list
  function handlePageSelection(pageName) {
    setActiveTab(pageName);
  }

  // Handle dynamic sidebar frame tracking shifting classes
  let wrapperClassNames = "main-layout-wrapper";
  if (isOpen === true) {
    wrapperClassNames = "main-layout-wrapper shifted";
  }

  return (
    <div className={wrapperClassNames}>
      
      {/* We pass state managers into our Nav layer component */}
      <Nav 
        isMenuOpen={isOpen} 
        currentPage={activeTab} 
        onPageChange={handlePageSelection} 
      />

      <main className="content-inner-padding">
        
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