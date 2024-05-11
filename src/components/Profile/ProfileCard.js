import React from 'react';
import './ProfileCard.css';

// This component is used to show the profile card.
const ProfileCard = ({ profileData }) => {
  const { name, username, numItems, profileImage } = profileData;

  return (
    <div className="profile-card">
      <div className="profile-image-container">
        <img src={`data:image/jpeg;base64,${profileImage}`} alt="Profile" className="profile-image" />
      </div>
      <div className="profile-info">
        <h2>{name}</h2>
        <p>{username}</p>
        <p>Clothes: {numItems}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

