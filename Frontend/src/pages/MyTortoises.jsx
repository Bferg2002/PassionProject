import React, { useState } from 'react';

function MyTortoises() {
  // 1. Mock Database Profiles (This is what your backend will eventually provide)
  const [tortoises, setTortoises] = useState([
    {
      id: 't1',
      name: 'Shelly',
      species: 'Sulcata Tortoise',
      age: '3 Years',
      birthdate: '2023-04-12',
      weight: '470g',
      length: '110mm SCL',
      avatar: '🐢'
    },
    {
      id: 't2',
      name: 'Tank',
      species: 'Russian Tortoise',
      age: '7 Years',
      birthdate: '2019-08-22',
      weight: '850g',
      length: '145mm SCL',
      avatar: '🪵'
    }
  ]);

  // 2. Track which profile is currently selected/active
  const [activeTortoiseId, setActiveTortoiseId] = useState('t1');

  // Find the full object data for the currently selected active profile
  const activeTortoise = tortoises.find((t) => t.id === activeTortoiseId) || tortoises[0];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* PAGE HEADER OVERVIEW AREA */}
      <header style={{ width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#091e16', margin: 0 }}>My Tortoises</h1>
        <p style={{ color: '#048a60', marginTop: '8px', fontSize: '1.15rem', fontWeight: '500' }}>
          View profiles and manage individual reptilian family members
        </p>
      </header>

      {/* TWO-COLUMN PROFILE AND GRAPH WORKSPACE SPLIT */}
      <div style={{ display: 'flex', gap: '32px', width: '100%', flexWrap: 'wrap', marginTop: '16px' }}>
        
        {/* LEFT COLUMN: TORTOISE PROFILE SELECTOR SIDEBAR */}
        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#091e16', margin: 0, fontWeight: '700' }}>Profiles</h2>
            <button style={{
              backgroundColor: '#048a60',
              color: '#ffffff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              + Add New
            </button>
          </div>

          {/* Profile Cards Selection List */}
          {tortoises.map((tortoise) => {
            const isActive = tortoise.id === activeTortoiseId;
            return (
              <div 
                key={tortoise.id}
                onClick={() => setActiveTortoiseId(tortoise.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: isActive ? '2px solid #048a60' : '2px solid #e2e8f0',
                  backgroundColor: isActive ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: isActive ? '0 4px 12px rgba(4, 138, 96, 0.08)' : 'none'
                }}
              >
                <div style={{ fontSize: '2rem', backgroundColor: isActive ? '#ffffff' : '#f8fafc', padding: '8px', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  {tortoise.avatar}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontWeight: '700', color: '#091e16', fontSize: '1.1rem' }}>{tortoise.name}</span>
                  <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '500' }}>{tortoise.species}</span>
                  <span style={{ fontSize: '0.8rem', color: '#048a60', fontWeight: '600', marginTop: '2px' }}>{tortoise.age}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: DYNAMIC SUMMARY CANVAS AND GRAPH VIEWER */}
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Summary Banner Metadata row */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.4rem', color: '#091e16' }}>
              {activeTortoise.name}'s Overview
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>SPECIES</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#334155' }}>{activeTortoise.species}</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>CURRENT WEIGHT</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#048a60' }}>{activeTortoise.weight}</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>SHELL LENGTH</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#334155' }}>{activeTortoise.length}</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>DATE OF BIRTH</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#334155' }}>{activeTortoise.birthdate}</span>
              </div>
            </div>
          </div>

          {/* Growth Curve Chart Block Area */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', color: '#091e16' }}>Growth Curve</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
              Historical weight tracking logs for {activeTortoise.name}
            </p>

            {/* Visual placeholder box for your future line graph canvas element */}
            <div style={{
              flex: 1,
              border: '2px dashed #cbd5e1',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '2.5rem' }}>📈</span>
              <div>
                <span style={{ display: 'block', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Growth Timeline Canvas
                </span>
                <span style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '340px', display: 'block' }}>
                  When connected to the backend, loading profile <strong>"{activeTortoise.id}"</strong> will dynamically populate custom weights here.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MyTortoises;