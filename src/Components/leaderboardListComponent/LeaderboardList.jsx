import './LeaderboardList.scss';
import { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig';

export const LeaderboardList = () => {
  const [users, setUsers] = useState([]);
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await api.get('/users/leaderboard/max-scores');
        const sortedUsers = response.data.data.sort((a, b) => b.totalScore - a.totalScore);
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []); // Fetch data when the component mounts

  const handleShowMore = () => setDisplayCount((prev) => prev + 3);
  const handleShowLess = () => setDisplayCount((prev) => Math.max(prev - 3, 3));

  return (
    <div className="leaderboard-list">
      <div className="list-header">
        <div>Name</div>
        <div>Hours</div>
        <div>Points</div>
      </div>

      <ul>
        {users.slice(0, displayCount).map((user, index) => (
          <li key={user.id || index}>
            <div className="rank">{index + 4}</div> {/* Start from 4 since top 3 are shown separately */}
            <img
              src={user.profile_picture || `https://i.pravatar.cc/150?img=${index + 4}`}
              alt={user.name}
            />
            <div className="name">{user.name}</div>
            <div className="hours">{user.totalTimeInHours || 0} hrs</div>
            <div className="points">{user.totalScore || 0} pts</div>
          </li>
        ))}
      </ul>

      {displayCount < users.length && (
        <button onClick={handleShowMore}>Show More</button>
      )}
      {displayCount > 3 && (
        <button onClick={handleShowLess}>Show Less</button>
      )}
    </div>
  );
};
