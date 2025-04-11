import { Link } from 'react-router-dom';
import './BeachCards.scss';
import api from '../../utils/axiosConfig'; 
import { useEffect, useState } from 'react';

export const BeachCard = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Fetch locations from the API
        api.get("/locations")
            .then((res) => setLocations(res.data.data)) // Set the fetched locations in state
            .catch((err) => console.error("Error fetching locations:", err)); // Log errors if the API call fails
    }, []); // Run only once when the component mounts

    return (
        <>
            <div className="beaches-header">
                <h2>Beaches near you</h2>
                {/* Link to add a new beach */}
                <Link to="/card">
                    <img className="plus-icon" src="/assets/Icons/Plus.svg" alt="Add Beach" />
                </Link>
            </div>

            <div className="beach-gallery">
                {/* Render a card for each location */}
                {locations.map((location) => (
                    <div className="beach-card" key={location.id}>
                        <div className="image-container">
                            <Link to={`/beach/${location.id}`} className="beach-card-link">
                                <img src={location.image_url} alt={location.title} />
                            </Link>
                        </div>
                        <div className="details">
                            <Link to={`/beach/${location.id}`} className="beach-card-link">
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