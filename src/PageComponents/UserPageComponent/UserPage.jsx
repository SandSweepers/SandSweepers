import './UserPage.scss';
import React from 'react';
import { ProfileHeader } from '../../Components/ProfileHeaderComponent/ProfileHeader';
import { StatsCard } from '../../Components/StatsCardComponent/StatsCard';
import { LastPlaces } from '../../Components/LastPlacesComponent/LastPlaces';


export const UserPage = () => {
  return (
    <div className="user-profile">
      <ProfileHeader />
      <StatsCard />
      <LastPlaces />
    </div>
  );
};