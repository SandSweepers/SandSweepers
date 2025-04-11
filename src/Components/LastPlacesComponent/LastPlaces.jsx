import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import api from '../../utils/axiosConfig'; // 👈 Axios configurado con token
import './LastPlaces.scss';


export const LastPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    api.get('/locations')
      .then((response) => {
        setPlaces(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);

  return (
    <section className="last-places">
      <h2>Last Places Visited</h2>
      <div className="places-grid">
        {places.slice(0, 2).map((place) => (
          <div key={place.id} className="place-card">
            <div className="place-image">
              <img src={place.image_url} alt={place.title} />
            </div>
            <h3>{place.title}</h3>
            <p className="place-description">{place.description}</p>
            <div className="place-footer">
              <div className="distance">
                <FaMapMarkerAlt /> {place.address}
              </div>
              <div className="points">
                {place.dirtiness}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
