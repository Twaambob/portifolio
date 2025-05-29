import React from 'react';
import profile from '../assets/images/profile.png';

const ProfileImage = () => {
  return (
    <div className="avatar-container">
      <div className="profile-image">
        <img src={profile} alt="My profile" />
      </div>
      <div className="role-tag">Full Stack Developer</div>
    </div>
  );
};

export default ProfileImage;
