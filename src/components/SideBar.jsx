import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from "../assets/logo.png"
import { MdSubscriptions } from 'react-icons/md';
import { FaVideo, FaTwitter, FaUser, FaUpload, FaThumbsUp, FaRegUserCircle } from 'react-icons/fa';
import {RiSettings3Fill} from "react-icons/ri"

const SideBar = () => {
  const userStatus = useSelector((state) => state.auth.status)
  
  if(userStatus) return (
    <div className="hidden lg:fixed lg:top-0 lg:left-0 lg:bg-gray-800 lg:text-white lg:w-64 lg:min-h-screen lg:h-full lg:block">
      <div className="p-0">
        <h2 className="flex mb-3 p-0 items-center h-24">
          &nbsp; <img src={logo} alt="Logo" className='w-20 h-16 ml-3'/>
        </h2>
        <nav className="space-y-2">
          <NavLink to="/videos" className={({isActive})=>`flex items-baseline text-lg py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <FaVideo/> &nbsp; Videos
          </NavLink>
          <NavLink to="/registered-users" className={({isActive})=>`flex items-baseline text-lg  py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <MdSubscriptions/> &nbsp; Subscriptions
          </NavLink>
          <NavLink to="/tweets" className={({isActive})=>`flex items-baseline text-lg py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <FaTwitter /> &nbsp; Tweets
          </NavLink>
          <NavLink to="/profile-page" className={({isActive})=>`flex items-baseline text-lg py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <FaUser/> &nbsp; Profile Page
          </NavLink>
          <NavLink to="/upload-video" className={({isActive})=>`flex items-baseline text-lg py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <FaUpload /> &nbsp; Upload Video
          </NavLink>
          <NavLink to="/My-dashboard" className={({isActive})=>`flex items-baseline text-lg py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <FaRegUserCircle /> &nbsp; My dashboard
          </NavLink>
          <NavLink to="/liked-videos" className={({isActive})=>`flex items-baseline text-lg py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <FaThumbsUp /> &nbsp; Liked Videos
          </NavLink>
          <NavLink to="/settings" className={({isActive})=>`flex items-baseline text-lg py-2 px-4 rounded ${(isActive)? "bg-red-500" : "bg-gray-800"} hover:bg-gray-700`}>
          <RiSettings3Fill /> &nbsp; Settings
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
