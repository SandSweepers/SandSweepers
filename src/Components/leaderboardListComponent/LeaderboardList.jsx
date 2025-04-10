import './LeaderboardList.scss';
import { useState } from 'react';

export const LeaderboardList = ({ users }) => {
    const [displayCount, setDisplayCount] = useState(3);

    const handleShowMore = () => setDisplayCount(prev => prev + 3);
    const handleShowLess = () => setDisplayCount(prev => Math.max(prev - 3, 3));

    return (
        
        <div className="leaderboard-list">
            <div className="list-header">
                    <span className='list-name'>Name</span>
                    <span className='list-hours'>Hours</span>
                    <span className='list-points'>Points</span>
            </div>

            <ul>
                {users.slice(0, displayCount).map((user, index) => (
                    <li key={user.id}>
                        <div className="rank">{index + 4}</div>
                        <img src={user.profile_picture} alt={user.username} />
                        <div className="name">{user.username}</div>
                        <div className="hours">{user.total_time_spent}</div>
                        <div className="points">{user.points} pts</div>
                    </li>
                ))}
            </ul>

            {displayCount < users.length && (
                <button onClick={handleShowMore}>Show More</button>
            )}
        </div>
    );
};
