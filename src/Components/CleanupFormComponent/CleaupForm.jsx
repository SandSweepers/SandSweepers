import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CleanupForm.scss';

export const CleanupForm = () => {
  const { id } = useParams(); // Location ID
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [trashCount, setTrashCount] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Store the selected image in state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // Add the image file
    formData.append('kg', trashCount); // Add trash count (kg)
    formData.append('time', timeSpent); // Add time spent
    formData.append('locationId', id); // Add location ID
    formData.append('userId', 1); // Hardcoded user ID (replace with actual user ID if available)

    try {
      const response = await axios.post('http://localhost:8080/api/Activities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // alert('Activity successfully submitted!');
        navigate(`/beach/${id}`); // Redirect to the beach detail page
    } 
    // else {
    //     alert('Failed to submit activity. Please try again.');
    //   }
    } catch (error) {
      console.error('Error submitting activity:', error);
    //   alert('An error occurred while submitting the activity.');
    }
  };

  return (
    <div className="cleanup-form">
      <form onSubmit={handleSubmit}>
        <div className="image-upload">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded beach"
              className="preview-image"
            />
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">📷</div>
              <p>Upload Picture</p>
              <p className="upload-subtitle">Of the trash you collected</p>
            </div>
          )}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="trash-count">How much trash did you collect (kg)</label>
          <input
            type="number"
            id="trash-count"
            value={trashCount}
            onChange={(e) => setTrashCount(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="time-spent">How much time did you spend (Hours)</label>
          <input
            type="number"
            id="time-spent"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};