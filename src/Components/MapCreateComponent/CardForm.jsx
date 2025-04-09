import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CardForm = ({ onCardCreated, location }) => {
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    image: null,
    location: '',
    dirtiness: '',
    address: '' // Added address field
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    if (!location) {
      alert("Please select a location on the map first");
      return;
    }

    try {
      // Only proceed if an image file is selected
      if (formData.image) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const payload = {
            title: formData.title,
            description: formData.description,
            imageBase64: reader.result,
            lat: location.lat,
            lng: location.lng,
            dirtiness: formData.dirtiness,
            address: formData.address // Ensure 'address' is sent in the payload
          };

          const res = await fetch('http://localhost:8802/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) {
            throw new Error(`Server responded with ${res.status}`);
          }

          const newCard = await res.json();
          if (onCardCreated) {
            onCardCreated(newCard);
          }
          
          // Navigate to home page after successful submission
          navigate('/map');
        };

        reader.readAsDataURL(formData.image);
      
      } else {
        alert("Please select an image");
      }
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Failed to create card. Please try again.");
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        accept="image/*" 
        required 
        onChange={e => setFormData({ ...formData, image: e.target.files[0] })} 
      />
      
      <input 
        type="text" 
        placeholder="Title" 
        required 
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })} 
      />
      
      <textarea 
        placeholder="Tell Us About The Beach" 
        required 
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })} 
      />
      
      <textarea 
        placeholder="Address" 
        required 
        value={formData.address}
        onChange={e => setFormData({ ...formData, address: e.target.value })} 
      />
      
      <select 
        required 
        value={formData.dirtiness}
        onChange={(e) => setFormData({ ...formData, dirtiness: e.target.value })}
      >
        <option value="" disabled>How Dirty Is The Beach</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      
      {location ? (
        <p>Selected location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
      ) : (
        <p>Click on the map to select a location</p>
      )}
      
      
      <button type="submit">Create Card</button>
    </form>
  );

}