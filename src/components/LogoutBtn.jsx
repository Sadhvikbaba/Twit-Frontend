import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { logout as videoLogout } from '../store/videoSlice';
import { logout as tweetLogout } from '../store/tweetSlice';
import { logout as playlistLogout } from '../store/playlistSlice';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {SlLogout} from "react-icons/sl"
import {logout as connectingLogout} from "../connecting/connecting.js"

function LogoutBtn() {
    const port = import.meta.env.VITE_URI; 
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = async () => {
            await connectingLogout()
            .then(dispatch(logout()))
            .then(dispatch(videoLogout()))
            .then(dispatch(tweetLogout()))
            .then(dispatch(playlistLogout()))
            .then(navigate('/'))
            .catch(dispatch(() => {logout() ; navigate('/')}))
        
    };

    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white"
            onClick={logoutHandler}
        >
            <SlLogout className='text-xl font-extrabold'/>
        </button>
    );
}

export default LogoutBtn;
