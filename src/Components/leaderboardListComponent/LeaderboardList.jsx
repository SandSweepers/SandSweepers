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
                setDummyData(sortedUsers); // all users
            })
            .catch(error => {
                console.error('Error fetching dummy data:', error);
            });
    }, []);

    const handleShowMore = () => {
        setDisplayCount((prevCount) => prevCount + 3); // Alice change the number to what works for design
    };

    return (
        <>
            <h1>Leaderboard</h1>
            <ul>
                {dummyData.slice(3, 3 + displayCount).map((user) => (
                    <li key={user.id}>
                        <img src={user.profile_picture} alt={user.username} />
                        <h3>Name: {user.username}</h3>
                        <p>PTS: {user.points}</p>
                        <p>Time: {user.total_time_spent} Hours</p>
                    </li>
                ))}
            </ul>
            {displayCount + 3 < dummyData.length && ( 
                <button onClick={handleShowMore}>Show More</button>
            )}
        </>
    );
};