import './ProfileHeader.scss';
import React from 'react';

// Profile Header Component
export const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <div className="banner">
        <div className="actions">
          <button className="icon-button">freinds</button>
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