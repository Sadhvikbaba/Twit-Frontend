import React , {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { FaPencilAlt } from 'react-icons/fa';
import { Input, Button ,VideoCard, LoadingSpinner} from "../components";
import { PopupExample } from "../components";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {RiDeleteBin5Fill} from "react-icons/ri";
import { useParams , useNavigate } from "react-router-dom";
import { deletePlaylist, getPlaylistById, updatePlaylist , removeVideoFromPlaylist} from "../connecting/connecting";
import { deletePlaylist as storeDel} from "../store/playlistSlice";
import { useDispatch } from "react-redux";



const PlaylistPage = () => {
  const { register, handleSubmit } = useForm();
  const [editPlaylist, setEditPlaylist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState({});
  const { slug } = useParams();
  const Navigate = useNavigate()
  const Dispatch = useDispatch()

  useEffect(() => {
      const fetchPlaylist = async () => {
          try {
              const res = await getPlaylistById(slug);
              setPlaylist(res.message);
              setLoading(false)
          } catch (error) {
              console.error('Error fetching playlist:', error);
          }
      };

      fetchPlaylist();
  }, [slug , setPlaylist]);

  const submit = async (data) => {
    const res = await updatePlaylist(slug, data);
    setPlaylist((prev) => ({
      ...prev,
      name: res.message.name,
      description: res.message.description,
    }));
    setEditPlaylist((prev) => !prev);
  };

    const Orgdelete = async(slug) =>{
      const res = await deletePlaylist(slug)
      if(res){
      Dispatch(storeDel(slug))
      Navigate("/profile-page")}
    }

    const removeVideo = async (videoId) => {
      const res = await removeVideoFromPlaylist(videoId, slug);
      if (res) {
        setPlaylist((prev) => ({
          ...prev,
          videos: prev.videos.filter((video) => video._id !== videoId),
        }));
      }
    };

    if(loading)return <LoadingSpinner />
    return (
        <div className="mt-5 text-white p-2 mb-16">
            <div className="flex justify-between mb-2 my-3">
                <div className="font-bold text-xl">Playlist</div>
                <div className="flex space-x-3">
                  <FaPencilAlt className="cursor-pointer text-white text-2xl" onClick={()=> setEditPlaylist((prev) => !prev)}/>
                  <PopupExample content={<RiDeleteBin5Fill className="cursor-pointer text-white"/>} position="left">
                    <div className="cursor-pointer" onClick={()=> Orgdelete(slug)}>Confirm Delete Playlist</div>
                  </PopupExample>
                </div>
            </div>
            <div>
            {editPlaylist ? <div className="flex flex-row justify-center"> 
                    <form onSubmit={handleSubmit(submit)} className='my-4 w-full lg:w-2/3 space-y-4'>
                        <Input label="new name: " type="text" placeholder="name of the playlist" defaultValue={playlist.name}
                        {...register("name")}/>
                        <Input label="new description: " type="text" placeholder="description of the playlist" defaultValue={playlist.description}
                        {...register("description")}/>
                        <Button type="submit" className="w-full mt-4 flex justify-center items-center">edit &nbsp; <FaPencilAlt /></Button>
                    </form>
                </div> : <div>
                        <h1 className="text-red-700 text-xl lg:text-3xl">{playlist.name}</h1>
                        <div className="text-white text-base mt-2">{playlist.description}</div>
                    </div>}
            </div>
            <div className="flex flex-wrap justify-center mt-2 min-h-screen mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlist?.videos?.map((video , index) => (<div className="max-w-xs bg-gray-800 rounded-lg shadow-md  m-2 h-72 cursor-pointer" key={index}>
                <div className="relative" onClick={()=>Navigate(`/Video/${video._id}`)}>
                    <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}:00
                    </span>
                </div>
                <div className="p-4">
                    <h2 className="text-white font-semibold text-lg mb-2">{video.title}</h2>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span>{video.views} views</span>
                    <span>
                        <PopupExample content={<HiOutlineDotsVertical className='text-white text-xl cursor-pointer'/>} position="left">
                            <div className=' p-2 cursor-pointer' onClick={()=>removeVideo(video._id)}>remove from playlist</div>                        
                        </PopupExample>
                    </span>
                    </div>
                </div>
                </div>))}
                    </div>
            </div>
        </div>
    )
}
export default PlaylistPage