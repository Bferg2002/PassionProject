import React from 'react';
import './Nav.css'; 

import { 
  MdDashboard, 
  MdPets, 
  MdAssignment, 
  MdChat, 
  MdAttachMoney, 
  MdSettings,
  MdAccountCircle
} from 'react-icons/md';

// We catch 'isMenuOpen', 'currentPage', and 'onPageChange' from App.jsx
function Nav({ isMenuOpen, currentPage, onPageChange }) {
  
  // We removed the 'active' property from here because App.jsx tracks it now
  const navItems = [
    { name: 'Dashboard', icon: <MdDashboard size={22} /> },
    { name: 'My Tortoises', icon: <MdPets size={22} /> },
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

            // If this item's name matches the 'currentPage' state in App.jsx, highlight it!
            if (item.name === currentPage) {
              finalClassNames = "nav-item-btn active";
            }

            return (
              <button 
                key={index} 
                className={finalClassNames}
                onClick={function() {
                  onPageChange(item.name); // Tells App.jsx which button was clicked
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Nav;