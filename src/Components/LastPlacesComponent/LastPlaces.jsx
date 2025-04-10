import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa'; // this is for know untill we input icons in pubplic folder or make image 
import './LastPlaces.scss';

// this one fetches from my mysql database =D 


export const LastPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8802/cards')
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => console.error('Error fetching places:', error));
  }, []);

  return (
    <section className="last-places">
      <h2>Last Places Visited</h2>
      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <div className="place-image">
              <img
                src={place.image_url}
                alt={place.title}
              />
              <button className="favorite-button">
                <AiOutlineHeart />
              </button>
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