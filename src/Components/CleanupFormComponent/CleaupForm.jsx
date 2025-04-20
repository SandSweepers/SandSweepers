import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';
import './CleanupForm.scss';

export const CleanupForm = () => {
  const { id } = useParams(); // Location ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    kg: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.image) {
    //   alert('Please upload an image.');
    //   return;
    // }

    try {
      const userId = 1; // Replace this with user ID if its available Yami
      const payload = {
        kg: formData.kg,
        time: formData.time,
        locationId: id,
      };

      // Commented out the image upload logic. Lets put it back in when we make multer/cloudflare work
      /*
      if (!formData.image) {
        alert('Please upload an image.');
        return;
      }
      */

      // Right now it redirects to the card when done but it could go to Achevements or user progress, what do you think

      if (formData.image) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          payload.image = reader.result;

          const res = await api.post(`/activities/${userId}`, payload);

          if (res.status !== 201) {
            throw new Error(`Server responded with ${res.status}`);
          }

          navigate(`/beach/${id}`); 
        };

        reader.readAsDataURL(formData.image);
      } else {
        const res = await api.post(`/activities/${userId}`, payload);

        if (res.status !== 201) {
          throw new Error(`Server responded with ${res.status}`);
        }

        navigate(`/beach/${id}`); 
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
      alert('Failed to submit activity. Please try again.');
    }
  };

  return (
    <div className="cleanup-form">
      <form onSubmit={handleSubmit}>
        <div className="image-upload">
          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Uploaded trash"
              className="preview-image"
            />
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">📷</div>
              <p>Upload Picture (Optional)</p>
              <p className="upload-subtitle">Of the trash you collected</p>
            </div>
          )}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="kg">How much trash did you collect (kg)</label>
          <input
            type="number"
            id="kg"
            name="kg"
            value={formData.kg}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="time">How much time did you spend (Hours)</label>
          <input
            type="number"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};