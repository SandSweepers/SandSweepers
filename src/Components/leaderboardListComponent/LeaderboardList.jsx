import './LeaderboardList.scss';
import { useEffect, useState } from 'react';

export const LeaderboardList = () => {
    const [dummyData, setDummyData] = useState([]);
    const [displayCount, setDisplayCount] = useState(3); 

    useEffect(() => {
        fetch('/data/dummyData.json')
            .then(response => response.json())
            .then(data => {
                const sortedUsers = data.users.sort((a, b) => b.points - a.points); 
                setDummyData(sortedUsers);
            })
            .catch(error => {
                console.error('Error fetching dum fucking data:', error);
            });
    }, []);

    const handleShowMore = () => {
        setDisplayCount((prevCount) => prevCount + 3); // you can change this alice
    };

    return (
        <div className="leaderboard-list">
            <div className="list-header">
                <div>Friends</div>
                <div>Hours</div>
                <div>Points</div>
            </div>
            
            <ul>
                {dummyData.slice(3, 3 + displayCount).map((user, index) => (
                    <li key={user.id}>
                        <div className="rank">{index + 4}</div>
                        <img src={user.profile_picture} alt={user.username} />
                        <div className="name">{user.username}</div>
                        <div className="hours">{user.total_time_spent}</div>
                        <div className="points">{user.points} pts</div>
                    </li>
                ))}
            </ul>
            
            {displayCount + 3 < dummyData.length && ( 
                <button onClick={handleShowMore}>Show More</button>
            )}
        </div>
    );
};