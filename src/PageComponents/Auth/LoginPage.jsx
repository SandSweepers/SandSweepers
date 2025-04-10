import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import "./LoginPage.scss";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
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

    try {
      const response = await axios.post("http://localhost:8080/api/users/signin", formData);

      // Stocker le token JWT dans le localStorage
      localStorage.setItem("token", response.data.token);

      // Rediriger vers la page d'accueil ou une autre page protégée
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion.");
      console.error("Erreur :", err);
    }
  };

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="username"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};