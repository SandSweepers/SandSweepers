import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.scss';

// Default icon setup
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export const MapPage = () => {
    const [locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/locations')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch locations');
                }
                return res.json();
            })
            .then(data => setLocations(data.data))
            .catch(err => {
                console.error('Error fetching locations:', err);
                setError('Failed to load locations. Please try again later.');
            });
    }, []);

    const filteredLocations = locations.filter(location =>
        location.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="map-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="search-icon">
                    <i className="material-icons">search</i>
                </span>
            </div>
            <MapContainer center={[27.9629, -15.5896]} zoom={11} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {filteredLocations.map((location) => (
                    <Marker key={location.id} position={[location.lat, location.lng]}>
                        <Popup>
                            <img id='mapImage' src={location.image_url} alt={location.title} />
                            <h3>{location.title}</h3>
                            <p>{location.description}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};