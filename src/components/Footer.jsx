import React from 'react';
import { FaVideo, FaTwitter, FaUser, FaUpload } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import {CiCirclePlus} from "react-icons/ci"
import { useNavigate , NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
    const Navigate = useNavigate()
    const status = useSelector((state) => state.auth.status)
  if(status)return (
    <div className="flex justify-around items-center py-3 bg-gray-800 text-white fixed bottom-0 w-full shadow-lg">
      <NavLink className={({isActive})=>`flex flex-col items-center cursor-pointer ${(isActive)? "opacity-100" : "opacity-50"}`} to="/videos">
        <FaVideo className="text-2xl" />
        <p className="mt-1 text-xs">Videos</p>
      </NavLink>
      <NavLink className={({isActive})=>`flex flex-col items-center cursor-pointer ${(isActive)? "opacity-100" : "opacity-50"}`} to="/tweets">
        <FaTwitter className="text-2xl" />
        <p className="mt-1 text-xs">Tweets</p>
      </NavLink>
      <NavLink className={({isActive})=>`flex flex-col items-center cursor-pointer ${(isActive)? "opacity-100" : "opacity-50"}`} to="/upload-video">
        <CiCirclePlus className="text-2xl font-bold" />
        <p className="mt-1 text-xs">Upload</p>
      </NavLink>
      <NavLink className={({isActive})=>`flex flex-col items-center cursor-pointer ${(isActive)? "opacity-100" : "opacity-50"}`} to="/registered-users">
        <MdSubscriptions className="text-2xl" />
        <p className="mt-1 text-xs">Subscriptions</p>
      </NavLink>
      <NavLink className={({isActive})=>`flex flex-col items-center cursor-pointer ${(isActive)? "opacity-100" : "opacity-50"}`} to="/profile-page">
        <FaUser className="text-2xl" />
        <p className="mt-1 text-xs">You</p>
      </NavLink>
    </div>
  );
}

export default Footer;
