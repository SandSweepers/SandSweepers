import React, { useEffect, useState } from 'react';
import './Achievements.scss';

export const Achievements = ({ username }) => {
  const [achievements, setAchievements] = useState([]);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Fetch achievements
        const achievementsRes = await fetch('http://localhost:8080/api/achievements');
        const achievementsData = await achievementsRes.json();
        setAchievements(achievementsData.data);

        // Fetch user scores
        const scoresRes = await fetch('http://localhost:8080/api/users/leaderboard/max-scores');
        const scoresData = await scoresRes.json();
        const user = scoresData.data.find((user) => user.name === username);
        setUserScore(parseInt(user?.totalScore || 500));
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
