import { Link } from 'react-router-dom';
import './BeachCards.scss';
import api from '../../utils/axiosConfig'; 
import { useEffect, useState } from 'react';

export const BeachCard = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        api.get("/locations")
            .then((res) => setLocations(res.data.data))
            .catch((err) => console.error("Error fetching locations:", err));
    }, []);

    return (
        <>
            <div className="beaches-header">
                <h2>Beaches near you</h2>
                <Link to="/card">
                    <img className="plus-icon" src="/assets/Icons/Plus.svg" alt="Add Beach" />
                </Link>
            </div>

            <div className="beach-gallery">
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
