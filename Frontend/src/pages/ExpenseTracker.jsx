import React, { useState } from 'react';

function ExpenseTracker() {
  // Mock initial expense records matching your wireframe table data
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2021-09-10', category: 'Food', amount: 20, description: 'Fresh greens and calcium' },
    { id: 2, date: '2022-06-18', category: 'Equipment', amount: 10, description: 'Substrate bedding block' },
    { id: 3, date: '2022-09-17', category: 'Vet', amount: 10, description: 'De-worming checkup check' },
  ]);

  // Form input control states
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Form submission handler
  function handleAddExpense(e) {
    e.preventDefault();
    if (!amount || !date) return alert('Please fill out Amount and Date fields!');

    const newExpense = {
      id: Date.now(),
      date,
      category,
      amount: parseFloat(amount),
      description: description || 'N/A'
    };

    setExpenses([newExpense, ...expenses]);
    
    // Reset individual inputs
    setAmount('');
    setDescription('');
    setDate('');
  }

  return (
    <div className="expense-page-layout">
      {/* HEADER SECTION */}
      <header style={{ width: '100%', textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#091e16', margin: 0 }}>Expense Tracker</h1>
        <p style={{ color: '#048a60', marginTop: '8px', fontSize: '1.15rem', fontWeight: '500' }}>
          Manage dietary, enclosure, and medical budget metrics
        </p>
      </header>

      {/* DASHBOARD GRID SECTIONS */}
      <div className="expense-workspace-grid" style={{ display: 'flex', gap: '32px', width: '100%', flexWrap: 'wrap' }}>
        
        {/* LEFT COLUMN: VISUAL CHART & HISTORIC LOG LIST */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Chart Wrapper Card */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', color: '#091e16', textAlign: 'center' }}>Spending Breakdown</h2>
            
            {/* Visual Representation of Donut Graph block from Wireframe */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '24px 0' }}>
              <div style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'conic-gradient(#048a60 0% 35%, #34d399 35% 75%, #a7f3d0 75% 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 0 35px #ffffff'
              }}>
                <span style={{ fontWeight: '700', color: '#091e16', fontSize: '1.1rem' }}>Total</span>
              </div>
            </div>

            {/* Labels Indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.95rem', fontWeight: '600', color: '#374151', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#048a60', borderRadius: '2px' }}></span> Food (35%)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#34d399', borderRadius: '2px' }}></span> Equipment (40%)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#a7f3d0', borderRadius: '2px' }}></span> Vet (25%)
              </div>
            </div>
          </div>

          {/* Historic Data Grid Table */}
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', color: '#091e16' }}>Recent Expenses</h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Date</th>
                    <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Category</th>
                    <th style={{ padding: '12px 8px', fontWeight: '600', color: '#475569' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp) => (
                    <tr key={exp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 8px', color: '#334155' }}>{exp.date}</td>
                      <td style={{ padding: '12px 8px', color: '#334155' }}>
                        <span style={{
                          backgroundColor: exp.category === 'Food' ? '#dcfce7' : exp.category === 'Equipment' ? '#e0f2fe' : '#f3e8ff',
                          color: exp.category === 'Food' ? '#166534' : exp.category === 'Equipment' ? '#0369a1' : '#6b21a8',
                          padding: '4px 8px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600'
                        }}>
                          {exp.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#091e16' }}>${exp.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: NEW ENTRY SUBMISSION FORM CARD */}
        <div style={{ flex: '1 1 350px' }}>
          <div style={{ border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff', position: 'sticky', top: '24px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#091e16' }}>Add Expense</h2>
            
            <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Amount Entry block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Amount ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              {/* Selection Dropdown Category list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', backgroundColor: '#ffffff' }}
                >
                  <option value="Food">Food</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Vet">Vet</option>
                </select>
              </div>

              {/* Optional Memo Description Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Romaine, Dandelion"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              {/* Datepicker Picker */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', color: '#334155' }}
                />
              </div>

              {/* Submission Button */}
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
                  cursor: 'pointer', /* Fixed: added single quotes around pointer */
                  marginTop: '8px',
                  boxShadow: '0 4px 6px -1px rgba(4, 138, 96, 0.2)',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#036e4d'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#048a60'}
              >
                Log Expense
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ExpenseTracker;