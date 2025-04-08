import './LandingPage.scss';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="logo">Sand Sweepers logo</div>
      <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
      <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  );
};
