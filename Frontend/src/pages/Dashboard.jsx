import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  MdCheckCircleOutline, 
  MdRadioButtonUnchecked, 
  MdAdd, 
  MdScale, 
  MdStraighten, 
  MdCake,
  MdLightbulb // FIX 1: Corrected name for the Material Design lightbulb icon
} from 'react-icons/md';

// Mock data representing the sample tortoise growth path over months
const growthData = [
  { month: 'Jan', weight: 120 },
  { month: 'Feb', weight: 135 },
  { month: 'Mar', weight: 150 },
  { month: 'Apr', weight: 180 },
  { month: 'May', weight: 210 },
  { month: 'Jun', weight: 245 },
];

// FIX 2: Added missing definitions for the UVB Bulb Radial PieChart Gauge
const uvPercentage = 84; 
const UV_COLORS = ['#048a60', '#e2e8f0']; // ShellSchedule active green and neutral gray back-ring
const uvChartData = [
  { name: 'Remaining Life', value: uvPercentage },
  { name: 'Expended Life', value: 100 - uvPercentage },
];

function Dashboard() {
  // Sample local states to handle the interactive checkboxes from your wireframe
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Soak Tortoise (20 mins)', completed: true },
    { id: 2, text: 'Fresh Greens & Calcium', completed: false },
    { id: 3, text: 'Check Enclosure Humidity', completed: false },
    { id: 4, text: 'Measure Basking Temp', completed: false },
  ]);

  function toggleTask(id) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  return (
    <div className="dashboard-page-container">
      {/* 1. TOP HEADER SUMMARY GRID SECTION */}
      <div className="stats-summary-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper age-bg">
            <MdCake size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Current Age</span>
            <span className="stat-value">1 yr, 4 mos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper weight-bg">
            <MdScale size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Last Weight</span>
            <span className="stat-value">245 grams</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper scl-bg">
            <MdStraighten size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">SCL Length</span>
            <span className="stat-value">11.4 cm</span>
          </div>
        </div>

        {/* UV BULB GAUGE CARD */}
        <div className="stat-card uv-bulb-card">
          <div className="uv-gauge-wrapper" style={{ width: 50, height: 50, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={uvChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={16}
                  outerRadius={22}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill={UV_COLORS[0]} />
                  <Cell fill={UV_COLORS[1]} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Optional: You can place an icon or the percentage text centered here */}
            <div className="uv-gauge-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '11px', fontWeight: 'bold' }}>
              {uvPercentage}%
            </div>
          </div>
          <div className="stat-details">
            <span className="stat-label">UVB Bulb Life</span>
            <span className="stat-value">120 Days Left</span>
          </div>
        </div>

      </div>

      {/* 2. THE GROWTH CURVE LINE CHART BOX */}
      <div className="chart-wrapper-card">
        <div className="chart-header">
          <h3>Growth Curve</h3>
          <span className="chart-subtitle">Weight Tracking Over Time</span>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#888888" />
              <YAxis tickLine={false} axisLine={false} stroke="#888888" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#048a60" 
                strokeWidth={3} 
                activeDot={{ r: 8 }} 
                dot={{ stroke: '#048a60', strokeWidth: 2, r: 4, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. LOWER TWO-COLUMN WIDGET SECTION */}
      <div className="dashboard-lower-layout">
        
        {/* Left Column: Daily Husbandry Checklist */}
        <div className="widget-card">
          <div className="widget-header">
            <h4>Daily Tasks</h4>
            <span className="widget-date-badge">Today</span>
          </div>
          <div className="checklist-wrapper">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`checklist-item ${task.completed ? 'done' : ''}`}
                onClick={() => toggleTask(task.id)}
                style={{ cursor: 'pointer' }}
              >
                <button className="check-toggle-btn" style={{ background: 'none', border: 'none', padding: 0 }}>
                  {task.completed ? (
                    <MdCheckCircleOutline size={22} color="#048a60" />
                  ) : (
                    <MdRadioButtonUnchecked size={22} color="#8c9ba5" />
                  )}
                </button>
                <span className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Action Quick Logs Launcher */}
        <div className="widget-card action-launcher-card">
          <h4>Quick Logging</h4>
          <p className="action-hint-text">Did you take a new entry measurement today?</p>
          
          <button className="dashboard-primary-action-btn">
            <MdAdd size={20} />
            <span>Add New Entry Log</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;