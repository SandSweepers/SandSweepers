import './Leaderboard.scss';
import { useEffect, useState } from 'react';
import { LeaderboardList } from '../leaderboardListComponent/LeaderboardList';

export const Leaderboard = () => {
    const [sortedUsers, setSortedUsers] = useState([]);
    const [showMore, setShowMore] = useState(true); // Default to true to show the list on load

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/users/leaderboard/max-scores');
                const data = await res.json();

                // Map and format the data to match the leaderboard structure
                const validUsers = data.data.map((user, index) => ({
                    id: index + 1, // Generate a unique ID for each user
                    name: user.name,
                    totalScore: parseInt(user.totalScore) || 0, // Parse totalScore as an integer
                    totalTimeInHours: parseInt(user.totalTimeInHours) || 0 // Parse totalTimeInHours as an integer
                }));

                // Sort users by totalScore in descending order
                const sorted = validUsers.sort((a, b) => b.totalScore - a.totalScore);
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
                <div className="logo"><img src="public/images/ChatGPT Image 10 apr 2025, 13_42_15 1.svg" alt="logo" /></div> 
                <h1>Sand Sweepers</h1>
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
                                <img
                                    src={`https://i.pravatar.cc/150?img=${user.id}`} // Generate avatar dynamically
                                    alt={user.name}
                                    className="avatar"
                                />
                            </div>
                            <div className="user-details">
                                <h3>{user.name}</h3>
                                <p>PTS: {user.totalScore}</p>
                                <p>Hours: {user.totalTimeInHours}</p>
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