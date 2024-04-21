import React from 'react';
import './styles/ProfileCard.css';
const ProfileCard = ({ profileData }) => {
  const { name, username, numItems, numOutfits, profileImage } = profileData;

  return (
    <div className="profile-card">
      <div className="profile-image-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <div className="profile-info">
        <h2>{name}</h2>
        <p>@{username}</p>
        <p>Number of items: {numItems}</p>
        <p>Number of outfits: {numOutfits}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
