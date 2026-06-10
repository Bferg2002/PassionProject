import React, { useState } from 'react';

function AccountSettings() {
  // 1. Local state to manage user form variables
  const [username, setUsername] = useState('Bryant Ferguson');
  const [email, setEmail] = useState('bryant@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Preference switches toggles
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  // Form submission handler
  function handleSaveSettings(e) {
    e.preventDefault();
    // Simulate updating backend API endpoint
    alert('Account settings successfully updated!');
    setCurrentPassword('');
    setNewPassword('');
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* PAGE HEADER */}
      <header style={{ width: '100%', textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#091e16', margin: 0 }}>Account Settings</h1>
        <p style={{ color: '#048a60', marginTop: '8px', fontSize: '1.15rem', fontWeight: '500' }}>
          Manage profile visibility and sensitive personal data
        </p>
      </header>

      {/* SETTINGS CONTENT CONTAINER MAPPED IN THE GREEN/WHITE LAYOUT */}
      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* CARD SECTION 1: PROFILE DETAILS */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#091e16', fontWeight: '700', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              Profile Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Full Name</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* CARD SECTION 2: SECURITY & CONFIGURATION */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#091e16', fontWeight: '700', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              Security
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Current Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* CARD SECTION 3: SYSTEM PREFERENCES TABS */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#091e16', fontWeight: '700', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              Preferences
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Toggle 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>
                    Reminders &amp; Alerts
                  </label>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Receive email logs regarding tank cleaning or UV bulb timers.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: '#048a60', cursor: 'pointer' }}
                />
              </div>

              {/* Toggle 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>
                    Weekly Weight Summary
                  </label>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Receive aggregated growth metrics data charts directly to your inbox.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={weeklyReports}
                  onChange={(e) => setWeeklyReports(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: '#048a60', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* MASTER ACTIONS FOOTER BUTTON */}
          <button 
            type="submit" 
            style={{
              backgroundColor: '#048a60',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              alignSelf: 'flex-end',
              paddingLeft: '32px',
              paddingRight: '32px',
              boxShadow: '0 4px 6px -1px rgba(4, 138, 96, 0.15)',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#036e4d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#048a60'}
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default AccountSettings;