import './LeaderboardList.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const LeaderboardList = () => {
  const [users, setUsers] = useState([]);
  const [displayCount, setDisplayCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/leaderboard/max-scores');
        setUsers(response.data.data); // Assuming the data is inside `data` key
      } catch (error) {
        setError('Error fetching leaderboard data');
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const handleShowMore = () => setDisplayCount((prev) => prev + 3);
  const handleShowLess = () => setDisplayCount((prev) => Math.max(prev - 3, 3));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="leaderboard-list">
      <div className="list-header">
        <div>Name</div>
        <div>Hours</div>
        <div>Points</div>
      </div>

      <ul>
        {users.slice(0, displayCount).map((user, index) => (
          <li key={user.id}>
            <div className="rank">{index + 1}</div> {/* Display correct rank starting from 1 */}
            <img
              src={`https://i.pravatar.cc/150?img=${user.id}`} // Generate avatar dynamically
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
