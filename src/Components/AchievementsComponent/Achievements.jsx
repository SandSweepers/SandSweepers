import React, { useEffect, useState } from 'react';
import './Achievements.scss';
import api from '../../utils/axiosConfig';  // Importing axios instance

export const Achievements = ({ username }) => {
  const [achievements, setAchievements] = useState([]);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Fetch achievements
        const achievementsRes = await api.get('/achievements'); // Using axios to fetch achievements
        setAchievements(achievementsRes.data.data);

        // Fetch user scores
        const scoresRes = await api.get('/users/leaderboard/max-scores'); // Using axios to fetch user scores
        const user = scoresRes.data.data.find((user) => user.name === username);
        setUserScore(parseInt(user?.totalScore || 500)); // Default score of 500 if no user found
      } catch (error) {
        console.error('Error fetching achievements or user scores:', error);
      }
    };

    fetchAchievements();
  }, [username]);

  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <div className="achievement-cards">
        {achievements
          .filter((achievement) => userScore >= achievement.points) // Filter achievements based on user score
          .map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <span>{achievement.points} Points</span>
            </div>
          ))}
      </div>
    </div>
  );
};
