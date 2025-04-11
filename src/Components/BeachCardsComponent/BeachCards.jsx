import { Link } from 'react-router-dom';
import './BeachCards.scss';
import { useEffect, useState } from 'react';

export const BeachCard = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/locations')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch locations');
                }
                return response.json();
            })
            .then(data => setLocations(data.data))
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }, []);

    return (
        <>
            <div className="beaches-header">
                <h2>Press To Play!</h2>
                <Link to="/card">
                    Add Your Own!
                    <img src="/assets/Icons/Plus.svg" alt="Add Icon" />
                </Link>
            </div>

            <div className="beach-gallery">
                {locations.map((location) => (
                        <div className="beach-card" key={location.id} >
                            <div className="image-container">
                            <Link to={`/beach/${location.id}`}  className="beach-card-link">
                            <img src={location.image_url} alt={location.title} />
                            </Link>
                            </div>
                            <div className="details">
                            <Link to={`/beach/${location.id}`}  className="beach-card-link">
                                <h3>{location.title}</h3>
                                <p>{location.description}</p>
                                </Link>
                                <Link to="/map">{location.address}</Link>
                                <span>PTS: {location.dirtiness}</span>
                            </div>
                        </div>
                ))}
            </div>
        </>
    );
};