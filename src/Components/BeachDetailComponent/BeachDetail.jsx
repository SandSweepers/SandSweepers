import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BeachDetail.scss';

export const BeachDetail = () => {
  const { id } = useParams();
  const [beach, setBeach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch beach details
    fetch(`http://localhost:8080/api/locations`)
      .then(response => response.json())
      .then(data => {
        const foundBeach = data.data.find(item => item.id === parseInt(id));
        setBeach(foundBeach);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching beach details:', error);
        setLoading(false);
      });

    // Fetch users who have been here (placeholder - in a real app, you'd fetch actual participants)
    fetch('http://localhost:8080/api/users')
      .then(response => response.json())
      .then(data => {
        // Just take the first 4 users as an example
        setUsers(data.data.slice(0, 4));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!beach) {
    return <div className="error">Beach not found</div>;
  }

  return (
    <div className="beach-detail">
      <div className="beach-image">
        <img src={beach.image_url} alt={beach.title} />
      </div>
      
      <div className="beach-info">
        <h2>{beach.title.toUpperCase()}</h2>
        
        <div className="description-section">
          <h3>Description</h3>
          <p>{beach.description}</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sed id placeat consequatur, ex facilis reiciendunt ipsum tempore perferendis dolorem finibus...</p>
        </div>
        
        <div className="trash-collected">
          <h3>Trash Collected</h3>
          <div className="trash-amount">
            <div className="trash-icon">🗑️</div>
            <div className="trash-weight">34 kg</div>
          </div>
        </div>
        
        <div className="participants">
          <h3>Who have been here</h3>
          <div className="user-avatars">
            {users.map(user => (
              <div key={user.id} className="avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
            ))}
          </div>
        </div>
        
        <Link to={`/cleanup-form/${id}`} className="i-was-here-button">
          I WAS HERE
          <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
};
