import React from "react";
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";

const VideoCard = ({_id, thumbnail, title, duration, views, createdAt }) => {
  const Navigate = useNavigate()
  let time = parseInt(duration)
  let mins = (parseInt(time/60)).toString();
  let seconds = (time%60).toString();
  if(mins.length==0)mins="00";
  if(mins.length==1)mins=`0${mins}`;
  if(seconds.length == 0)seconds="00";
  if(seconds.length==1)seconds=`0${seconds}`;

    return (
      <div className="max-w-xs bg-gray-800 rounded-lg shadow-md  m-2 h-72 cursor-pointer" onClick={()=>Navigate(`/Video/${_id}`)}>
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {mins}:{seconds}
          </span>
        </div>
        <div className="p-4">
          <h2 className="text-white font-semibold text-lg mb-2">{title}</h2>
          <div className="flex justify-between items-center text-gray-400 text-sm">
            <span>{createdAt ? format(new Date(createdAt), "PPP"): null}</span>
            <span>{parseInt(views)} views</span>
          </div>
        </div>
      </div>
    );
  };

export default VideoCard