import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardForm.scss';
import api from '../../utils/axiosConfig';

export const CardForm = ({ onCardCreated, location }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    address: '',
    dirtiness: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert('Please select a location on the map first.');
      return;
    }

    if (!formData.image) {
      alert('Please upload an image.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const payload = {
          title: formData.title,
          description: formData.description,
          imageBase64: reader.result,
          lat: location.lat,
          lng: location.lng,
          address: formData.address,
          dirtiness: formData.dirtiness
        };

        // Use Axios to make the POST request
        const res = await api.post('/locations', payload);

        if (res.status !== 200) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const newCard = res.data;
        if (onCardCreated) onCardCreated(newCard);
        navigate('/map');
      };

      reader.readAsDataURL(formData.image);
    } catch (error) {
      console.error('Error creating card:', error);
      alert('Failed to create card. Please try again.');
    }
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <label htmlFor="image">Upload Image</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        required
        onChange={handleFileChange}
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter title"
        required
        value={formData.title}
        onChange={handleInputChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Enter description"
        required
        value={formData.description}
        onChange={handleInputChange}
      />

      <label htmlFor="address">Address</label>
      <textarea
        id="address"
        name="address"
        placeholder="Enter address"
        required
        value={formData.address}
        onChange={handleInputChange}
      />

      <label htmlFor="dirtiness">Dirtiness Level</label>
      <select
        id="dirtiness"
        name="dirtiness"
        required
        value={formData.dirtiness}
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select dirtiness level
        </option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {location ? (
        <p>Selected location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
      ) : (
        <p>Please select a location on the map.</p>
      )}

      <button type="submit">Create Card</button>
    </form>
  );
};
