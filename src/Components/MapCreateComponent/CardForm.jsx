import { useState } from 'react';

export const CardForm = ({ onCardCreated, location }) => {
  const [formData, setFormData] = useState({ title: '', description: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const payload = {
        ...formData,
        imageBase64: reader.result,
        lat: location.lat,
        lng: location.lng
      };

      const res = await fetch('http://localhost:8802/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const newCard = await res.json();
      onCardCreated(newCard);
    };

    reader.readAsDataURL(formData.image);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" required onChange={e => setFormData({ ...formData, title: e.target.value })} />
      <textarea placeholder="Description" required onChange={e => setFormData({ ...formData, description: e.target.value })} />
      <input type="file" accept="image/*" required onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
      {location ? (
        <p>Selected location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
      ) : (
        <p>Click on the map to select a location</p>
      )}
      <button type="submit">Create Card</button>
    </form>
  );
} 