import React, { useState, useEffect } from 'react';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const { default: profile } = await import(
          /* webpackMode: "lazy-once" */
          /* webpackPreload: true */
          '../assets/images/profile.png'
        );
        setProfileImage(profile);
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    };
    loadImage();
  }, []);

  return (
    <div className="avatar-container">
      <div className="profile-image">
        {profileImage ? (
          <img
            src={profileImage}
            alt="My profile"
            loading="lazy"
            srcSet={`${profileImage} 1x, ${profileImage} 2x`}
            width="200"
            height="200"
            decoding="async"
          />
        ) : (
          <div className="profile-image-placeholder" />
        )}
      </div>
      <div className="role-tag">Full Stack Developer</div>
    </div>
  );
};

export default ProfileImage;
