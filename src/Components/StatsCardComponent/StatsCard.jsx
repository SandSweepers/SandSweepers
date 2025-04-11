import './StatsCard.scss';
import React, { useEffect, useState } from 'react';
import api from '../../utils/axiosConfig';  // Importing axios instance

export const StatsCard = () => {
  const [stats, setStats] = useState({ totalTrash: 0, totalHours: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/users/leaderboard/scores'); // Using axios for the GET request
        const data = res.data.data;

        let totalTrash = 0;
        let totalHours = 0;

        data.forEach((user) => {
          user.activities.forEach((activity) => {
            totalTrash += activity.score / 1000; // Convert score to kg
            totalHours += activity.timeInHours / 100; // Add hours
          });
        });

        setStats({ totalTrash: totalTrash.toFixed(1), totalHours: totalHours.toFixed(1) });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="stats-card">
      <div className="stats-grid">
        <div className="stat-item">
          <h2>{stats.totalTrash} kg</h2>
          <p>Trash Collected</p>
        </div>
        <div className="stat-item">
          <h2>{stats.totalHours} hrs</h2>
          <p>Hours Spent Cleaning</p>
        </div>
      </div>
    </div>
  );
};
