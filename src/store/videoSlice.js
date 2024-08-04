import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    videos : [],
    page : 1
}

const videoSlice = createSlice({
    name : "video",
    initialState,
    reducers : {
        video : (state , action) => {
            state.videos = [...action.payload];
            state.page++;
        },
        addVideo : (state , action) => {
            state.videos = [...state.videos,action.payload];
            state.page++;
        },
        addBunch : (state , action) => {
            state.videos = [...state.videos,...action.payload];
            state.page++;
        },
        deleteVideo : (state,action) => {
            state.videos = state.videos.filter((video) => video._id != action.payload)
        },
        logout : (state) => {
            state.videos = []
            state.page = 1
        }
    }
})

export const {video, logout ,addVideo , deleteVideo , addBunch} = videoSlice.actions;

export default videoSlice.reducer;