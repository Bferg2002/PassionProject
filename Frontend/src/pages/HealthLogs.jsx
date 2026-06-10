import React, { useState } from 'react';

function HealthLogs() {
  // 1. Initial local mock health state matching your wireframe metrics
  const [logs, setLogs] = useState([
    {
      id: 1,
      date: '2026-05-20',
      weight: 470,
      length: 110,
      feeding: 'Romaine, Dandelion greens',
      calcium: true,
    },
    {
      id: 2,
      date: '2026-05-05',
      weight: 450,
      length: 106,
      feeding: 'Hibiscus leaves, Grass pellets',
      calcium: false,
    }
  ]);

  // 2. Add New Log Input Form States
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [feedingLog, setFeedingLog] = useState('');
  const [hasCalcium, setHasCalcium] = useState(false);
  const [date, setDate] = useState('');

  // 3. Form submit listener to add data logs dynamically
  function handleAddLog(e) {
    e.preventDefault();
    if (!weight || !length || !date) {
      return alert('Please fill in Date, Weight, and Shell Length parameters!');
    }

    const newLog = {
      id: Date.now(),
      date,
      weight: parseFloat(weight),
      length: parseFloat(length),
      feeding: feedingLog || 'None logged',
      calcium: hasCalcium,
    };

    setLogs([newLog, ...logs]);

    // Clear user form variables back to baseline
    setWeight('');
    setLength('');
    setFeedingLog('');
    setHasCalcium(false);
    setDate('');
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* PAGE HEADER */}
      <header style={{ width: '100%', textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#091e16', margin: 0 }}>Health Logs</h1>
        <p style={{ color: '#048a60', marginTop: '8px', fontSize: '1.15rem', fontWeight: '500' }}>
          Log shell measurements and scale weight records
        </p>
      </header>

      {/* GRID DISPLAY: LEFT TABLE LOGS & RIGHT INPUT PANEL */}
      <div style={{ display: 'flex', gap: '32px', width: '100%', flexWrap: 'wrap' }}>
        
        {/* LEFT COLUMN: HISTORIC LOG LIST TABLE */}
        <div style={{ flex: '2 1 500px', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff' }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#091e16', fontWeight: '700' }}>Measurement History</h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Date</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Weight (g)</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Length (mm)</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Feeding Log</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Supplements</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 8px', color: '#334155', fontWeight: '500' }}>{log.date}</td>
                    <td style={{ padding: '14px 8px', fontWeight: '700', color: '#048a60' }}>{log.weight}g</td>
                    <td style={{ padding: '14px 8px', color: '#334155' }}>{log.length} mm SCL</td>
                    <td style={{ padding: '14px 8px', color: '#475569', fontSize: '0.9rem' }}>{log.feeding}</td>
                    <td style={{ padding: '14px 8px' }}>
                      <span style={{
                        backgroundColor: log.calcium ? '#dcfce7' : '#f1f5f9',
                        color: log.calcium ? '#166534' : '#64748b',
                        padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600'
                      }}>
                        {log.calcium ? '✓ Calcium' : 'None'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: WIREFRAME ADD NEW LOG SYSTEM PANEL */}
        <div style={{ flex: '1 1 320px' }}>
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff', position: 'sticky', top: '24px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#091e16', fontWeight: '700' }}>Add New Log</h2>
            
            <form onSubmit={handleAddLog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Weight Form Block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Weight (Grams)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 470"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              {/* Shell SCL length Block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Length (SCL mm)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 110"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              {/* Feeding Log Entry Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Feeding Log</label>
                <input 
                  type="text" 
                  placeholder="e.g. Romaine, Dandelion"
                  value={feedingLog}
                  onChange={(e) => setFeedingLog(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              {/* Date Input Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', color: '#334155' }}
                />
              </div>

              {/* Checkbox item block for Supplement Tracking */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
                <input 
                  type="checkbox" 
                  id="calciumCheck"
                  checked={hasCalcium}
                  onChange={(e) => setHasCalcium(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#048a60', cursor: 'pointer' }}
                />
                <label htmlFor="calciumCheck" style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
                  Includes Supplements (Calcium)
                </label>
              </div>

              {/* Submit Log Button */}
              <button 
                type="submit" 
                style={{
                  backgroundColor: '#048a60',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '8px',
                  boxShadow: '0 4px 6px -1px rgba(4, 138, 96, 0.15)',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#036e4d'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#048a60'}
              >
                Submit Log
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HealthLogs;