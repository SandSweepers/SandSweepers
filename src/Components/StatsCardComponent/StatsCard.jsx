import './StatsCard.scss';
import React from 'react';

export const StatsCard = () => {
    return (
      <div className="stats-card">
        <div className="stats-grid">
          <div className="stat-item">
            <h2>8</h2>
            <p>Beaches visited</p>
          </div>
          <div className="stat-item">
            <h2>15 kg</h2>
            <p>Garbage collected</p>
          </div>
          <div className="stat-item">
            <h2>21</h2>
            <p>Trips</p>
          </div>
        </div>
  
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress" style={{ width: "10.92%" }}></div>
            <div className="trophy" style={{ left: "10.92%" }}>🏆</div>
          </div>
          <div className="progress-info">
            <span>1,092 steps done</span>
            <span>Goal 10,000</span>
          </div>
        </div>
      </div>
    );
  };