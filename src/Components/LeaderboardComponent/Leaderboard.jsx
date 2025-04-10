import './Leaderboard.scss';
import { useEffect, useState } from 'react';
import { LeaderboardList } from '../leaderboardListComponent/LeaderboardList';

export const Leaderboard = () => {
  const [dummyData, setDummyData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch('/data/dummyData.json')
      .then(response => response.json())
      .then(data => {
        const sortedUsers = data.users.sort((a, b) => b.points - a.points); // Sort users by points
        setDummyData(sortedUsers);
      })
      .catch(error => {
        console.error('Error fetching dummy data:', error);
      });
  }, []);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };

  return (
    <div className="leaderboard">
      <div className="rectangle"></div>
      <div className="leaderboard-header">
        <div className="logo">LOGO</div>
        <h1>Leaderboard</h1>
      </div>
      <div className="top-users">
        {dummyData.slice(0, 3).map((user, index) => {
          // Determine position class
          let positionClass = "";
          if (index === 1) positionClass = "second-position";
          else if (index === 0) positionClass = "first-position";
          else if (index === 2) positionClass = "third-position";

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
      {showMore && <LeaderboardList />}
      {!showMore ? (
        <button className="see-more-btn" onClick={handleShowMore}>
          See More
        </button>
      ) : (
        <button className="see-less-btn" onClick={handleShowLess}>
          Show Less
        </button>
      )}
    </div>
  );
};