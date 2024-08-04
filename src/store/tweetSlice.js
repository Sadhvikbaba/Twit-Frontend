import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [],
    page: 1
};

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        setTweets: (state, action) => {
            state.tweets = [...action.payload];
            state.page += 1;
        },
        addTweets: (state, action) => {
            state.tweets = [...state.tweets,action.payload];
            state.page += 1;
        },
        toggleLike: (state, action) => {
            state.tweets = state.tweets.map((tweet) =>
                tweet._id === action.payload._id
                    ? { ...tweet, isLiked: !tweet.isLiked , totalLikes : (action.payload.like)? tweet.totalLikes+=1 :tweet.totalLikes-=1}
                    : tweet
            );
        },
        deleteTweet : (state , action) => {
            state.tweets = state.tweets.filter((tweet) => tweet._id != action.payload);
        },
        updateTweet : (state , action) => {
            state.tweets = state.tweets.map((tweet) => tweet._id == action.payload._id? {...tweet , content : action.payload.content}:tweet);
        },
        logout: (state) => {
            state.tweets = [];
            state.page = 1;
        }
    }
});

export const { setTweets, toggleLike,deleteTweet, logout , addTweets , updateTweet} = tweetSlice.actions;

export default tweetSlice.reducer;
