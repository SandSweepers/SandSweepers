import './UserPage.scss';
import React from 'react';
import { Link } from "react-router-dom";

import { ProfileHeader } from '../../Components/ProfileHeaderComponent/ProfileHeader';
import { StatsCard } from '../../Components/StatsCardComponent/StatsCard';
import { LastPlaces } from '../../Components/LastPlacesComponent/LastPlaces';
import { StatusBar } from '../../Components/StatusBarComponent/StatusBar';
import { Achievements } from '../../Components/AchievementsComponent/Achievements';

export const UserPage = () => {
  return (
    <div className="user-profile">
      <ProfileHeader />
      <StatsCard />
      <StatusBar />
      <LastPlaces />
      <Achievements />
      <ul className="big-buttons">
        <li>
          <Link className="settings" to="/settings">Settings</Link>
        </li>
        <li>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="friends">Friends</a>
        </li>
        <li>
          <a href="https://www.facebook.com/groups/1184294093171766" target="_blank" rel="noopener noreferrer" className="community">Community</a>
        </li>
      </ul>
    </div>
  );
};