import React from 'react';

function ExpenseTracker() {
  return (
    <div>
      <header>
        <h1>Expense Tracker</h1>
        <p style={{ color: '#048a60', marginTop: '8px', fontSize: '1.15rem', fontWeight: '500' }}>
          Manage dietary, enclosure, and medical budget metrics
        </p>
      </header>
      
      <section style={{ marginTop: '32px' }}>
        {/* Your future budget breakdown chart and expense input list go here */}
      </section>
    </div>
  );
}

export default ExpenseTracker;