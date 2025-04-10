import './Leaderboard.scss';
import { useEffect, useState } from 'react';
import { LeaderboardList } from '../leaderboardListComponent/LeaderboardList';

export const Leaderboard = () => {
    const [sortedUsers, setSortedUsers] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/users/leaderboard/max-scores');
                const data = await res.json();

                // Filter out users with null scores (optional)
                const validUsers = data.data.map((user, index) => ({
                    id: index + 1,
                    username: user.name,
                    profile_picture: `https://example.com/avatar/default.jpg`, // Placeholder or replace with real avatar
                    points: parseInt(user.totalScore) || 0,
                    total_time_spent: parseInt(user.totalTimeInHours) || 0
                }));

                const sorted = validUsers.sort((a, b) => b.points - a.points);
                setSortedUsers(sorted);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchData();
    }, []);

    const handleShowMore = () => setShowMore(true);
    const handleShowLess = () => setShowMore(false);

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <div className="logo">LOGO</div>
                <h1>Leaderboard</h1>
            </div>

            <div className="top-users">
                {sortedUsers.slice(0, 3).map((user, index) => {
                    let positionClass = '';
                    if (index === 1) positionClass = 'second-position';
                    else if (index === 0) positionClass = 'first-position';
                    else if (index === 2) positionClass = 'third-position';

                    return (
                        <div key={user.id} className={`user-card ${positionClass}`}>
                            <div className="avatar-container">
                                <img src={user.profile_picture} alt={user.username} className="avatar" />
                            </div>
                            <div className="user-details">
                                <h3>{user.username}</h3>
                                <p>PTS: {user.points}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showMore && <LeaderboardList users={sortedUsers.slice(3)} />}
            {!showMore ? (
                <button className="see-more-btn" onClick={handleShowMore}>See More</button>
            ) : (
                <button className="see-less-btn" onClick={handleShowLess}>Show Less</button>
            )}
        </div>
    );
};
