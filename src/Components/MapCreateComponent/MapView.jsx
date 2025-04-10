import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CardForm } from './CardForm';
import './MapView.scss';

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

export const MapView = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/locations');
        if (!res.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await res.json();
        setCards(data.data);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards. The map will still work for adding new locations.');
      }
    };

    fetchCards();
  }, []);

  const LocationSetter = () => {
    useMapEvents({
      click: (e) => {
        setSelected(e.latlng);
      }
    });
    return null;
  };

  const addNewCard = (card) => {
    setCards((prev) => [...prev, card]);
  };

  return (
    <div className="map-view-container">
      <CardForm onCardCreated={addNewCard} location={selected} />
      <div className="map-container">
        <MapContainer 
          center={[27.9629, -15.5896]} 
          zoom={11} 
          className="leaflet-container"
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationSetter />
          {cards
            .filter((card) => card.lat && card.lng && !isNaN(card.lat) && !isNaN(card.lng)) // Filter out invalid lat/lng
            .map((card) => (
              <Marker key={card.id} position={[card.lat, card.lng]}>
                <Popup>
                  {card.image_url && <img src={card.image_url} width="100" alt={card.title} />}
                  <strong>{card.title}</strong><br />
                  {card.address}<br />
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};