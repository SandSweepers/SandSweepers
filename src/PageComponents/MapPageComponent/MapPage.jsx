import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.scss';

export const MapPage = () => {
    useEffect(() => {
        const map = L.map('map-container', {
            center: [28.0033198, -15.4163828], // Updated center coordinates
            zoom: 13, // Updated zoom level
            scrollWheelZoom: false, // Disable scroll wheel zoom
        });

        // Add a tile layer (e.g., OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add a marker as an example
        L.marker([28.0033198, -15.4163828]).addTo(map).bindPopup('Gran Canaria').openPopup();

        return () => {
            map.remove(); // Clean up the map instance on component unmount
        };
    }, []);

    return <div id="map-container" className="map-container"></div>;
};






