import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {FaRegPlusSquare} from "react-icons/fa";
import {Input , Button , PopupExample ,ProfilePicture} from "../components/index";
import { useForm } from "react-hook-form";
import { useSelector , useDispatch } from "react-redux";
import {createPlaylist, deleteHistory, getWatchHistory} from "../connecting/connecting"
import { setPlaylist , addPlaylist } from "../store/playlistSlice";

const ProfilePage = () => {
    const [newPlaylist, setNewPlaylist] = useState(false);
    const [watchHistory, setWatchhistory] = useState();
    const [playlists, setPlaylists] = useState([]);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const userData = useSelector((state)=>state.auth.userData)
    const playlistsFromStore = useSelector((state) => state.playlist.playlist);
    
    useEffect(() => {
        setPlaylists(playlistsFromStore);
    }, [playlistsFromStore]);

    useEffect(() => {
        const fetchWatchHistory = async () => {
            try {
                const res = await getWatchHistory();
                setWatchhistory(res.message);
            } catch (error) {
                
            }
        };
  
        fetchWatchHistory();
    },[]);

    const deleteWatchHistory = async () =>{
        await deleteHistory()
        .then((res) => setWatchhistory(false))
    }

    const submit = async (data) => {
        await createPlaylist(data)
            .then((res) => {
                dispatch(addPlaylist(res.message))
                setPlaylist((prev) => [...prev, res.message]);
                setNewPlaylist(false)
            })
            .catch((error) => console.error('Error creating playlist:', error));
    };

    const convert = (duration)=>{
        let time = parseInt(duration)
        let mins = (parseInt(time/60)).toString();
        let seconds = (time%60).toString();
        if(mins.length==0)mins="00";
        if(mins.length==1)mins=`0${mins}`;
        if(seconds.length == 0)seconds="00";
        if(seconds.length==1)seconds=`0${seconds}`;
        return [mins,":",seconds]
    }

    return (
        <>
            <div className="flex flex-col mt-2 text-white box-border">
                <div className="flex items-start border-b p-4 border-gray-200 mb-5">
                <ProfilePicture username={userData.userName} profilePictureUrl={userData.avatar} className="w-8 h-8 rounded-full mr-4"/>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <span className="font-bold font-sans text-red-700">{userData.userName}</span>
                            <Link to="/My-dashboard" className="hover:border-b hover:border-white flex items-center justify-end">
                                View Channel <BiChevronRight />
                            </Link>
                        </div>
                        <p className="text-white mt-2">{userData.fullName}</p>
                    </div>
                </div>
                <div className="py-2 w-full flex justify-between sm:justify-evenly px-2 text-red-700">
                    <Link to="/upload-video" className="hover:underline ">Upload Video</Link>
                    <Link to="/tweets" className="hover:underline ">Upload Tweet</Link>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between mb-2 px-4 mt-2">
                        <div>History</div>
                        <div><PopupExample content={<RiDeleteBin5Fill className="cursor-pointer"/>} position="left">
                            <div className="cursor-pointer" onClick={() => deleteWatchHistory()}>delete watch history</div>
                        </PopupExample> </div>
                    </div>
                </div>
            </div>
            <div className="flex overflow-x-auto space-x-4 p-4 ">
                {watchHistory && watchHistory?.map((video, index) => (
                    <div key={index} className="flex-shrink-0 relative cursor-pointer" onClick={()=> Navigate(`/Video/${video._id}`)}>
                        <img src={video.thumbnail} alt={`Random ${index}`} className="h-32 w-52 sm:w-64 sm:h-40 object-cover rounded-lg" />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                            {convert(video.duration)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-white mt-2 px-4 mb-20">
                <div className="flex justify-between mb-2 my-3">
                    <div>Playlists</div>
                    <div ><FaRegPlusSquare className="cursor-pointer text-white" onClick={()=> setNewPlaylist((prev) => !prev)}/></div>
                </div>
                {newPlaylist &&<div className="flex flex-row justify-center"> 
                    <form onSubmit={handleSubmit(submit)} className='my-4 w-full lg:w-2/3 space-y-4'>
                        <Input label="name: " type="text" placeholder="name of the playlist"
                        {...register("name", {required: true, })}/>
                        <Input label="description: " type="text" placeholder="description of the playlist"
                        {...register("description", {required: true, })}/>
                        <Button type="submit" className="w-full mt-4">create</Button>
                    </form>
                </div>}
                {playlists.map((playlist , index) => <div key={index} className="border-b border-gray-500 p-2">
                    <h1 className="text-lg text-red-700 font-bold font-sans"><Link to={`/playlist-page/${playlist._id}`}>{playlist.name}</Link></h1>
                    <p className="text-sm">{playlist.description}</p>
                </div>)}
                <div className="mt-4 cursor-pointer" onClick={()=>Navigate("/liked-videos")}>
                    Liked videos
                </div>
                
            </div>
        </>
    );
};

export default ProfilePage;