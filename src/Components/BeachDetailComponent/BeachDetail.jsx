import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './BeachDetail.scss';

export const BeachDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beach, setBeach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchBeach = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8802/cards/${id}`);
        if (!response.ok) {
          throw new Error('Beach not found');
        }
        const data = await response.json();
        setBeach(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBeach();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div className="beach-detail">
      <div className="beach-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <button className="favorite-button" onClick={toggleFavorite}>
          {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>
      
      <div className="beach-image">
        <img 
          src={beach.image_url || '/beach-placeholder.jpg'} 
          alt={beach.title}
        />
      </div>
      
      <div className="beach-content">
        <h1 className="beach-title">{beach.title}</h1>
        
        <section className="beach-section">
          <h2>Description</h2>
          <p className="beach-description">{beach.description || 'No description available.'}</p>
        </section>
        
        <section className="beach-section trash-section">
          <h2>Trash collected</h2>
          <div className="trash-info">
            <div className="trash-icon">
              <FaTrashAlt />
            </div>
            <div className="trash-amount">
              <span>{beach.trash_amount || '34'} kg</span>
            </div>
          </div>
        </section>
        
        <section className="beach-section visitors-section">
          <h2>Who have been here</h2>
          <div className="visitors-avatars">
            {/* Placeholder avatars - in a real app, these would come from the database */}
            <div className="avatar"><img src="/avatar-placeholder.jpg" alt="Visitor" /></div>
            <div className="avatar"><img src="/avatar-placeholder.jpg" alt="Visitor" /></div>
            <div className="avatar"><img src="/avatar-placeholder.jpg" alt="Visitor" /></div>
            <div className="avatar"><img src="/avatar-placeholder.jpg" alt="Visitor" /></div>
          </div>
        </section>
        
        <div className="beach-location">
          <p>Location: {beach.lat}, {beach.lng}</p>
          <p>Address: {beach.address || 'No address provided'}</p>
          <p>Dirtiness level: {beach.dirtiness || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="action-button-container">
        <button className="action-button">
          I WAS HERE
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
};

