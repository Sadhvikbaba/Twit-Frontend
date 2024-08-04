import React from 'react';

const ProfilePicture = ({ username, profilePictureUrl , className , special}) => {
    const initials = getInitials(username);

    if (profilePictureUrl) {
        return <img src={profilePictureUrl} alt="Profile" className={className} />;
    } else {
        return (
            <div className={`profile-initials ${className} bg-blue-500 flex justify-center items-center font-semibold text-white ${special}`}>
                {initials}
            </div>
        );
    }
};

const getInitials = (username) => {
    if (!username) return '';
    return username.charAt(0).toUpperCase();
};

export default ProfilePicture;
