// src/components/Nav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // 1. Import NavLink from react-router-dom
import './Nav.css'; 

// Import the specific path vector string from the mdi package
import { mdiTortoise } from '@mdi/js';

// Import standard react-icons for your other menu buttons
import { 
  MdDashboard, 
  MdAssignment, 
  MdChat, 
  MdAttachMoney, 
  MdSettings,
  MdAccountCircle,
  MdLogout 
} from 'react-icons/md';

// 2. Note: We removed 'currentPage' and 'onPageChange' since URLs track the path now!
// Note: Changed prop name to 'onLogout' to match the handler name we passed from App.jsx
function Nav({ isMenuOpen, onLogout }) {
  
  // 3. Set up the navigation items with their respective URL route paths instead of state strings
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard size={22} /> },
    { 
      name: 'My Tortoises', 
      path: '/my-tortoises',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d={mdiTortoise} />
        </svg>
      )
    },
    { name: 'Health Logs', path: '/health-logs', icon: <MdAssignment size={22} /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <MdChat size={22} /> },
    { name: 'Expense Tracker', path: '/expense-tracker', icon: <MdAttachMoney size={22} /> },
    { name: 'Account Settings', path: '/account-settings', icon: <MdSettings size={22} /> },
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
            return (
              /* 4. Use NavLink with a function inside className to automatically check if the link is active */
              <NavLink 
                key={index} 
                to={item.path}
                className={function({ isActive }) {
                  return isActive ? "nav-item-btn active" : "nav-item-btn";
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer-action">
        {/* Changed to use the onLogout handler matching App.jsx */}
        <button className="nav-logout-btn" onClick={onLogout}>
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