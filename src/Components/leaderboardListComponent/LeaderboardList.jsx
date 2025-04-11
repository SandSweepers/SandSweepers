import './LeaderboardList.scss';
import { useState } from 'react';

export const LeaderboardList = ({ users }) => {
    const [displayCount, setDisplayCount] = useState(3);

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
                    <li key={user.id}>
                        <div className="rank">{index + 4}</div> {/* Start rank from 4 */}
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
      {displayCount > 3 && users.length > 3 && (
        <button onClick={handleShowLess}>Show Less</button>
      )}
    </div>
  );
};

