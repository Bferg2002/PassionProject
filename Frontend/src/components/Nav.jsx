// src/components/Nav.jsx
import React from 'react';
import './Nav.css'; 

// 1. Import the specific path vector string from the mdi package
import { mdiTortoise } from '@mdi/js';

// 2. Import standard react-icons for your other menu buttons
import { 
  MdDashboard, 
  MdAssignment, 
  MdChat, 
  MdAttachMoney, 
  MdSettings,
  MdAccountCircle,
  MdLogout 
} from 'react-icons/md';

function Nav({ isMenuOpen, currentPage, onPageChange, onUserLogout }) {
  
  // 3. Set up the navigation items. 
  // We use a clean, native HTML <svg> box for My Tortoises and feed your 
  // mdiTortoise import variable right into a <path d={...} /> attribute.
  const navItems = [
    { name: 'Dashboard', icon: <MdDashboard size={22} /> },
    { 
      name: 'My Tortoises', 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d={mdiTortoise} />
        </svg>
      )
    },
    { name: 'Health Logs', icon: <MdAssignment size={22} /> },
    { name: 'AI Assistant', icon: <MdChat size={22} /> },
    { name: 'Expense Tracker', icon: <MdAttachMoney size={22} /> },
    { name: 'Account Settings', icon: <MdSettings size={22} /> },
  ];

  let sidebarClassNames = "sidebar-container";
  if (isMenuOpen === true) {
    sidebarClassNames = "sidebar-container open";
  }

  return (
    <aside className={sidebarClassNames}>
      
      <div>
        <div className="logo-section">
          <div className="logo-branding-left">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#059669">
              <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2zm1 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1 12c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
            </svg>
            <span className="logo-text">ShellSchedule</span>
          </div>
          <MdAccountCircle size={28} className="header-profile-avatar" />
        </div>

        <nav className="nav-links-list">
          {navItems.map(function(item, index) {
            let finalClassNames = "nav-item-btn";

            if (item.name === currentPage) {
              finalClassNames = "nav-item-btn active";
            }

            return (
              <button 
                key={index} 
                className={finalClassNames}
                onClick={function() {
                  onPageChange(item.name); 
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer-action">
        <button className="nav-logout-btn" onClick={onUserLogout}>
          <span className="logout-icon-wrapper">
            <MdLogout size={22} />
          </span>
          <span className="nav-text">Sign Out</span>
        </button>
      </div>

    </aside>
  );
}

export default Nav;