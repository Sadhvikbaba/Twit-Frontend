import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlist: [],
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setPlaylist: (state, action) => {
            state.playlist = [...action.payload];
        },
        addPlaylist: (state, action) => {
            state.playlist = [...state.playlist,action.payload];
        },
        addVideo: (state, action) => {
            state.playlist = state.playlist.map((playlist) =>
                playlist._id === action.payload._id
                    ? { ...playlist, videos: [...playlist.videos, action.payload.videoId] }
                    : playlist
            );
        },
        removeVideo: (state, action) => {
            state.playlist = state.playlist.map((playlist) =>
                playlist._id === action.payload._id
                    ? {
                          ...playlist,
                          videos: playlist.videos.filter((videoId) => videoId !== action.payload.videoId),
                      }
                    : playlist
            );
        },
        updatePlaylist: (state, action) => {
            state.playlist = state.playlist.map((playlist) =>
                playlist._id === action.payload._id ? action.payload.newPlaylist : playlist
            );
        },
        deletePlaylist: (state, action) => {
            state.playlist = state.playlist.filter((playlist) => playlist._id !== action.payload);
        },
        logout: (state) => {
            state.playlist = [];
        },
    },
});

export const { setPlaylist, addVideo, removeVideo, updatePlaylist, deletePlaylist, logout ,addPlaylist} = playlistSlice.actions;

export default playlistSlice.reducer;
