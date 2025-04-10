import { Logo } from '../../Components/ui/Logo';
import { AuthForm } from '../../Components/auth/AuthForm';
import { Button } from '../../Components/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../utils/axiosConfig";
import './SignUpPage.scss';

const SignupPage = () => {
  const fields = [
    { name: 'name', label: 'Full Name', required: true },
    { name: 'username', label: 'Username (Email)', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8080/api/users/', {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        role: 'USER',
      });

      setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setFormData({
        name: '',
        username: '',
        password: '',
        role: 'USER',
      });
      setTimeout(() => {
        navigate('/login'); // Redirige vers la page de connexion
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription');
      console.error('Erreur :', err);
    }
  };

  return (
    <div className="signup-page">
      <Logo />
      <AuthForm fields={fields} onSubmit={handleSubmit} onChange={handleChange} />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
};

export default SignupPage;