import React, { useState , useEffect} from "react";
import { LoadingSpinner, PopupExample } from "../components";
import {RiDeleteBin5Fill} from "react-icons/ri";
import { getLikedVideos ,toggleVideoLike} from "../connecting/connecting";
import { useNavigate } from "react-router-dom";

export const LikedVideos = () => {
    const [likedVideos , setLikedVideos] = useState()
    const [loading , setLoading] = useState(true)
    const Navigate = useNavigate()

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const res = await getLikedVideos();
                setLikedVideos(res.message);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };
  
        fetchLikedVideos();
    },[]);

    const like =async (id) => {
        const res = await toggleVideoLike(id)
        if (res) {
            setLikedVideos((prev) =>
            prev.filter((video) => video._id !== id),
            );
          }
    }

    if(loading) return <LoadingSpinner />
    return(
        <div className="min-h-screen text-white p-2 mx-auto max-w-7xl w-ful mb-16">
            <h1 className="text-3xl font-bold mb-6 cursor-pointer">Liked Videos</h1>
            <div className="flex flex-wrap justify-center mt-2 min-h-screen mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {likedVideos?.map((video , index) =>
                        <div className="max-w-xs bg-gray-800 rounded-lg shadow-md  m-2 h-72 cursor-pointer" key={index} onClick={()=> Navigate(`/Video/${video._id}`)}>
                            <div className="relative">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                    0:0{video.duration}
                                </span>
                            </div>
                            <div className="p-4">
                                <h2 className="text-white font-semibold text-lg mb-2">{video.title}</h2>
                                <div className="flex justify-between items-center text-gray-400 text-sm">
                                    <span>{parseInt(video.views)} views</span>
                                    <span>
                                        <PopupExample content={<RiDeleteBin5Fill className='text-white text-lg cursor-pointer' />} position="left">
                                            <div className=' p-2 cursor-pointer' onClick={()=>like(video._id)}>confirm unlike and remove</div>
                                        </PopupExample>
                                    </span>
                                </div>
                            </div>
                        </div>)}
                </div>
                </div>
        </div>
    )
}