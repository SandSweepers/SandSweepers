import './ProfileHeader.scss';
import React from 'react';

// Profile Header Component
export const ProfileHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/login"); // Redirige vers la page de connexion
  };
  return (
    <div className="profile-header">
      <div className="banner">
        <div className="actions">
        <button className="icon-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="profile-picture">
        <img src="/avatar-placeholder.jpg" alt="Profile" />
      </div>
      <h1 className="username">Yami</h1>
      <p className="bio">Master of the islands</p>
    </div>
  );
};