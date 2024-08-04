import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import videoSlice from './videoSlice.js';
import tweetSlice  from './tweetSlice.js';
import playlistSlice from './playlistSlice.js';

const store = configureStore({
    reducer: {
        auth : authSlice,
        video : videoSlice,
        tweet : tweetSlice,
        playlist : playlistSlice
    }
});


export default store;