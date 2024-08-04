import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {LogoutBtn , ProfilePicture} from "./index";
import logo from "../assets/logo.png"


export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const navItems = [
        {
          name: 'Home',
          slug: '/',
          active: !authStatus,
        },
        {
          name: 'Login',
          slug: '/login',
          active: !authStatus,
        },
        {
          name: 'Signup',
          slug: '/signup',
          active: !authStatus,
        }];
    
    return(
        <ul className="flex mt-3 ml-auto bg-zinc-900 justify-between px-4 w-full">
          <div>
            <img src={logo} alt="Logo" className="w-12 h-8"/>
          </div>
          <div className="flex">
        {navItems.map((item) => {
              if (item.active) {
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='px-4 lg:px-6 py-2 duration-200 text-red-700 hover:bg-red-700 rounded-full hover:text-white'
                    >
                      <span className="block lg:hidden">{item.responsiveName || item.name}</span>
                      <span className="hidden lg:block">{item.name}</span>
                    </button>&nbsp; &nbsp;
                  </li>
                );
              }
              return null;
            })}
        {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
        {authStatus && (
          <li onClick={() => navigate("/My-dashboard")}>
              <ProfilePicture username={userData.userName} profilePictureUrl={userData.avatar} className="w-10 h-10 rounded-full cursor-pointer" />
          </li>
          )}
        </div>
        </ul>
    )
}