import { Link } from 'react-router-dom';
import './BeachCards.scss';
import { useEffect, useState } from 'react';

export const BeachCard = () => {
    const [dummyData, setDummyData] = useState([]);

    useEffect(() => {
        fetch('/data/dummyData.json')
            .then(response => response.json())
            .then(data => {
                setDummyData(data.locations);
            })
            .catch(error => {
                console.error('Error fetching dummy data:', error);
            });
    }, []);

    return (
        <>
            <div className="beaches-header">
                <h2>Beaches near you</h2>
                <Link to={"/card"}><img className="plus-icon" src="/assets/Icons/Plus.svg"></img></Link>
            </div>

            <div className="beach-gallery">
                {dummyData.map((location) => (
                    <div key={location.id} className="beach-card">
                        <div className="image-container">
                            <img src={location.image} alt={location.name} />
                        </div>
                        <div className="details">
                            <h3>{location.name}</h3>
                            <p>{location.description}</p>
                            <Link to="/map">{location.address}</Link>
                            <span>PTS: {location.extra_points}</span>
                        
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};