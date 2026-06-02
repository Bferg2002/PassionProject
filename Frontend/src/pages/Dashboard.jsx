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
  MdCake
} from 'react-icons/md';

// 1. Mock data representing the sample tortoise growth path over months
const growthData = [
  { month: 'Jan', weight: 120 },
  { month: 'Feb', weight: 135 },
  { month: 'Mar', weight: 150 },
  { month: 'Apr', weight: 180 },
  { month: 'May', weight: 210 },
  { month: 'Jun', weight: 245 },
];

// 2. Hardware configuration inputs (Simulated database properties)
const tortoiseHardware = {
  uvbBulbInstalled: "2026-03-10", // Example installation date
  uvbLifespanMonths: 6,           // Standard 6-month lifespan
};

// 3. Dynamic metric calculation function
function calculateBulbMetrics(installDateStr, lifespanMonths) {
  const installDate = new Date(installDateStr);
  const today = new Date();
  
  // Convert standard lifespan months to total safe operating days
  const totalLifespanDays = lifespanMonths * 30.5; 
  
  // Calculate day deltas
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysPast = Math.floor((today - installDate) / msPerDay);
  
  // Restrict bounds so we don't break UI layout charts if overdue
  const daysLeft = Math.max(0, Math.ceil(totalLifespanDays - daysPast));
  const percentage = Math.max(0, Math.min(100, Math.round((daysLeft / totalLifespanDays) * 100)));
  
  return { daysLeft, percentage };
}

// 4. Run calculation and assign values for the chart
const { daysLeft, percentage: uvPercentage } = calculateBulbMetrics(
  tortoiseHardware.uvbBulbInstalled,
  tortoiseHardware.uvbLifespanMonths
);

// 5. Determine active chart coloration based on safety thresholds
let activeGaugeColor = '#048a60'; // Default healthy ShellSchedule Green
if (uvPercentage <= 20 && uvPercentage > 0) {
  activeGaugeColor = '#d97706';   // Warning Amber (under 20% life left)
} else if (uvPercentage === 0) {
  activeGaugeColor = '#dc2626';   // Critical Red (0% life left)
}

const UV_COLORS = [activeGaugeColor, '#e2e8f0']; // [Active State Slice, Unfilled Background Track]

const uvChartData = [
  { name: 'Remaining Life', value: uvPercentage },
  { name: 'Expended Life', value: 100 - uvPercentage },
];

function Dashboard() {
  // Local state handling interactive checklist items
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

        {/* DYNAMIC UV BULB GAUGE CARD */}
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
            <div className="uv-gauge-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '11px', fontWeight: 'bold', color: '#091e16' }}>
              {uvPercentage}%
            </div>
          </div>
          <div className="stat-details">
            <span className="stat-label">UVB Bulb Life</span>
            <span className="stat-value">{daysLeft} Days Left</span>
          </div>
        </div>

      </div>

      {/* 2. THE GROWTH CURVE LINE CHART BOX */}
      <div className="chart-wrapper-card">
        <div className="chart-header" style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#091e16', fontSize: '18px', fontWeight: '700' }}>Growth Curve</h3>
          <span className="chart-subtitle" style={{ color: '#166534', fontSize: '14px' }}>
            Weight Tracking Over Time (Grams)
          </span>
        </div>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={growthData} 
              margin={{ top: 20, right: 25, left: -10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                stroke="#166534"
                dy={10}
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                stroke="#166534"
                dx={-5}
                tickFormatter={(value) => `${value}g`}
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#091e16', 
                  borderRadius: '8px', 
                  border: 'none',
                  color: '#ffffff'
                }}
                itemStyle={{ color: '#eefbf4' }}
                labelStyle={{ fontWeight: 'bold', color: '#048a60', marginBottom: '4px' }}
                formatter={(value) => [`${value} grams`, 'Weight']}
              />
              
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#048a60" 
                strokeWidth={3} 
                activeDot={{ r: 8, fill: '#048a60' }} 
                dot={{ stroke: '#048a60', strokeWidth: 2, r: 5, fill: '#ffffff' }}
                label={{ 
                  position: 'top', 
                  fill: '#091e16', 
                  fontSize: 11, 
                  fontWeight: 600,
                  offset: 10,
                  formatter: (value) => `${value}g`
                }}
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
                <button className="check-toggle-btn" style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center' }}>
                  {task.completed ? (
                    <MdCheckCircleOutline size={22} color="#048a60" />
                  ) : (
                    <MdRadioButtonUnchecked size={22} color="#8c9ba5" />
                  )}
                </button>
                <span className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#166534' : '#091e16' }}>
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