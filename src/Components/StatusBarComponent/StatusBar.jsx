import React, { useEffect, useState } from 'react';
import './StatusBar.scss';
import api from '../../utils/axiosConfig';  // Importing axios instance

export const StatusBar = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxScore, setMaxScore] = useState(100); // Initial max score

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await api.get('/users/leaderboard/max-scores'); // Axios call
        const data = res.data.data;

        const total = data.reduce((sum, user) => sum + (parseInt(user.totalScore) || 0), 0);
        setTotalScore(total);

        // Calculate progress percentage
        const progressPercentage = (total / maxScore) * 100;
        setProgress(progressPercentage);

        // Double the max score if the total score reaches or exceeds the current max score
        if (total >= maxScore) {
          setMaxScore(maxScore * 2);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, [maxScore]); // Re-run when maxScore changes

  return (
    <div className="status-bar">
      <div className="status-info">
        <h2>Total Score: {totalScore}</h2>
        <p>Goal: {maxScore}</p>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};
