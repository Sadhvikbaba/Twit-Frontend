import React, { useState } from 'react';
import { FaThumbsUp } from "react-icons/fa";
import {PopupExample , ProfilePicture} from "./index"
import { toggleTweetLike } from '../connecting/connecting';
import { toggleLike } from '../store/tweetSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TweetCard = ({_id, avatar, username, content, isLiked ,totalLikes}) => {
  const [isLike, setIsLiked] = useState(isLiked);
  const [likes, setLikes] = useState(totalLikes);
  const Dispatch = useDispatch()
  const Navigate = useNavigate()

  const handleLikeClick = () => {
    toggleTweetLike(_id)
    .then((res)=>{
      Dispatch(toggleLike({_id , like : res.message.tweet}))
      setIsLiked(!isLike)
      if(res.message.tweet)setLikes(likes+1)
      else setLikes(likes-1)
    })
  };

  return (
    <div className="flex items-start p-4 border-b border-gray-700" >
      <ProfilePicture username={username} profilePictureUrl={avatar} className="w-12 h-12 rounded-full mr-4 cursor-pointer" 
      onClick={()=>Navigate(`/user-dashboard/${username}`)}/>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white cursor-pointer" onClick={()=>Navigate(`/user-dashboard/${username}`)}>{username}</span>
          <button onClick={handleLikeClick}
              className={`flex items-center text-sm ${isLike ? "text-blue-500" : "text-gray-400"}`}
            >
              <FaThumbsUp className="mr-1" />
              {likes}
            </button>
        </div>
        <p className="text-white mt-2">{content}</p>
        
      </div>
    </div>
  );
};

export default TweetCard;