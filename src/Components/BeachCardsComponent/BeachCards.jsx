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
                <h2>Beaches near you</h2>
                <Link to={"/card"}><img className="plus-icon" src="/assets/Icons/Plus.svg" alt="Add Beach"></img></Link>
            </div>

            <div className="beach-gallery">
                {locations.map((location) => (
                    <div key={location.id} className="beach-card">
                        <div className="image-container">
                            <img src={location.image_url} alt={location.title} />
                        </div>
                        <div className="details">
                            <h3>{location.title}</h3>
                            <p>{location.description}</p>
                            <Link to="/map">{location.address}</Link>
                            <span>PTS: {location.dirtiness}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};