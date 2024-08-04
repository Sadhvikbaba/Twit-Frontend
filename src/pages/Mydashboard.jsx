import React, { useEffect, useState } from 'react';
import { PopupExample, Input, Button, LoadingSpinner } from '../components/index';
import { RiDeleteBin5Fill , RiSettings3Fill} from "react-icons/ri";
import { FaPencilAlt } from 'react-icons/fa';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {ProfilePicture} from '../components/index';
import { deletecoverimage as storeDelCov, updatecoverimage as storeUpCov, deleteavatar as storeDelava, updateavatar as storeUpAva} from '../store/authSlice';
import { deleteVideo as storeDel } from '../store/videoSlice';
import { setTweets, deleteTweet as storeDelTweet , updateTweet as storeUpdateTweet} from '../store/tweetSlice';
import { getChannelStats , getUserChannelProfile , getChannelVideos, getUserTweets , deleteVideo , deleteTweet , updateTweet , toggleSubscription, deleteAvatar, updateAvatar, deleteCoverImage, updateCoverImage} from '../connecting/connecting';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultCoverImage from "../assets/defaultCoverImage.png"

const MyDashboard = ({
    coverImage = defaultCoverImage,
}) => {
    const [loading,setLoading]= useState(true)
    const [show, setShow] = useState(true);
    const [editTweetId, setEditTweetId] = useState(null);
    const [channelStats, setChannelStats] = useState();
    const [channelVideos, setChannelVideos] = useState();
    const [channelCounts, setChannelCounts] = useState();
    const [channelTweets, setChannelTweets] = useState();
    const userData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit , reset} = useForm();
    const Dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, profileRes, tweetsRes, videosRes] = await Promise.all([
                    getChannelStats(userData._id),
                    getUserChannelProfile(userData.userName),
                    getUserTweets(userData._id),
                    getChannelVideos(userData._id)
                ]);

                setChannelStats(statsRes.message);
                setChannelCounts(profileRes.message);
                setChannelTweets(tweetsRes.message);
                setChannelVideos(videosRes.message);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const Navigate = useNavigate()
    
    const submitEdit = async (data) =>{
        await updateTweet(editTweetId , data)
        .then((res)=> {
            setChannelTweets((prev) => prev.map((tweet) => 
                  tweet?._id == editTweetId 
                    ? { ...tweet, content: res?.message?.content } 
                    : tweet
                )
              );
            Dispatch(storeUpdateTweet({_id : editTweetId , content : res.message.content}))
        }).then(()=>setEditTweetId(false))
    }

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
    const deleteVid =(id)=>{
        deleteVideo(id)
        .then(()=> Dispatch(storeDel(id)))
        .then(setChannelVideos((prev)=> prev.filter((video) => id != video._id)))

    }
    const delTweet = async(id) =>{
        await deleteTweet(id)
        .then((res)=>{
            //console.log(res);
            Dispatch(storeDelTweet(id))})
        .then(()=> setChannelTweets((prev) => prev.filter((tweet)=>id != tweet._id)))
    }

    const Subscribe = async () =>{
        await toggleSubscription(channelCounts._id)
        .then((res) => {
            setChannelCounts({...channelCounts , isSubscribed : !channelCounts.isSubscribed})})
    }

    const deleteavatar = async () =>{
        await deleteAvatar()
        .then((res) =>{
            Dispatch(storeDelava())
            setChannelCounts({...channelCounts , avatar : ""})
        })
    }

    const deletecoverImage = async () =>{
        await deleteCoverImage()
        .then((res) =>{
            Dispatch(storeDelCov())
            setChannelCounts({...channelCounts , coverImage : ""})
        })
    }

    const updateavatar = async (e) =>{
        let data = e.target.files[0];
        if(!data)return;
        if(data.size > 3 * 1024 * 1024){
            toast.error("avatar should be less than 3MB");
            return;
        }
        let formData = new FormData()
        formData.append("avatar",data)
        await updateAvatar(formData)
        .then((res) =>{
            Dispatch(storeUpAva(res?.message?.user?.avatar))
            setChannelCounts({...channelCounts , avatar : res?.message?.user?.avatar})
        })
    }

    const updatecoverImage = async (e) =>{
        let data = e.target.files[0];
        if(!data)return;
        if(data.size > 4 * 1024 * 1024){
            toast.error("cover image should be less than 4MB");
            return;
        }
        let formData = new FormData()
        formData.append("coverImage",data)
        await updateCoverImage(formData)
        .then((res) =>{
            Dispatch(storeUpCov(res?.message?.user?.coverImage))
            setChannelCounts({...channelCounts , coverImage : res?.message?.user?.coverImage})
        })
    }
    if(loading)return <LoadingSpinner/>

    if(!loading)return (
        <>
            <div className="flex flex-wrap  mt-2 min-h-screen mx-auto w-full max-w-7xl">
                <div className="relative w-full h-64">
                    <img src={channelCounts?.coverImage || coverImage} alt="Cover" className="w-full md:h-full object-cover -z-10 h-2/3" />
                    <div className='absolute right-3 top-3 text-black'>
                        <div className='flex w-11 justify-between '>
                            <PopupExample content={<RiDeleteBin5Fill className='opacity-55 hover:opacity-100 cursor-pointer' />} position="left">
                                <div className='cursor-pointer' onClick={() =>deletecoverImage()}> delete cover image</div>
                            </PopupExample>
                            <label>
                                <input type="file" className="hidden" accept="image/*" onChange={updatecoverImage}/>
                                <FaPencilAlt className=' opacity-55 hover:opacity-100 cursor-pointer' />
                            </label>
                        </div>
                    </div>
                    <div className='absolute text-white right-4'>
                        <RiSettings3Fill className='mt-2 text-2xl cursor-pointer opacity-50 hover:opacity-100' onClick={() =>Navigate("/settings")}/>
                    </div>
                    <div className="absolute -bottom-1 md:-bottom-5 left-6 transform sm:translate-y-1/2">
                        <PopupExample content={
                            <ProfilePicture username={channelCounts.userName} profilePictureUrl={channelCounts.avatar} 
                            className="w-32 h-32 lg:w-48 lg:h-48  rounded-full border-4 border-zinc-900 text-6xl" />
                            } position={"right"} required={true}>
                            <div className='flex flex-col'>
                                <div className='border-b border-slate-400 p-2 cursor-pointer'>
                                <label className="cursor-pointer mt-3">
                                    <input type="file" className="hidden" accept="image/*" onChange={updateavatar}/>
                                    update avatar
                                </label>
                                    </div>
                                <div className='p-2 cursor-pointer' onClick={() =>deleteavatar()}> delete avatar</div>
                            </div>
                        </PopupExample>
                    </div>
                </div>
                <div className="max-w-4xl p-4  md:mt-16">
                    <div className="text-left mt-8 md:mt-14 lg:mt-8">
                        <h1 className="text-4xl font-bold text-red-700">{channelCounts.fullName}</h1>
                        <p className="text-gray-400">@{channelCounts.userName}</p>
                        <p className="text-gray-400">{channelCounts.email}</p>
                        <div className="mt-4" onClick={()=>Subscribe()}>
                            {channelCounts && <span className={`px-4 py-2 rounded-full ${channelCounts?.isSubscribed ? 'bg-green-500' : 'bg-red-500'} cursor-pointer`}>
                                {channelCounts?.isSubscribed ? 'Subscribed' : 'Subscribe'}
                            </span>}
                        </div>
                    </div>
                    {channelStats&& channelCounts &&<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ">
                        <div className="bg-gray-800 p-6 rounded-lg text-center cursor-pointer" onClick={() => Navigate(`/subscribers/${userData._id}`)}>
                            <h2 className="text-xl font-semibold text-red-400">{channelCounts.subscribersCount?channelCounts.subscribersCount:0}</h2>
                            <p className="text-gray-400">Subscribers</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center cursor-pointer" onClick={() => Navigate("/registered-users")}>
                            <h2 className="text-xl font-semibold text-red-400">{channelCounts.subscribedToCount?channelCounts.subscribedToCount : 0}</h2>
                            <p className="text-gray-400">Subscribed To</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <h2 className="text-xl font-semibold text-red-400">{channelStats.totalLikes? channelStats.totalLikes:0}</h2>
                            <p className="text-gray-400">Total Likes</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <h2 className="text-xl font-semibold text-red-400">{channelStats.totalViews?parseInt(channelStats.totalViews) : 0}</h2>
                            <p className="text-gray-400">Total Views</p>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="flex flex-wrap justify-center mt-2 w-full max-w-7xl mb-16">
                <div className='flex justify-evenly text-white w-full text-lg font-sans max-h-12'>
                    <div className='cursor-pointer hover:underline' onClick={() => setShow(true)}>videos</div>
                    <div className='cursor-pointer hover:underline' onClick={() => setShow(false)}>tweets</div>
                </div>
                {show ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 min-h-screen">
                    {channelVideos && channelVideos?.map((video, index) => (
                        <div className="max-w-xs bg-gray-800 rounded-lg shadow-md  m-2 h-72 cursor-pointer" key={index} onClick={()=>Navigate(`/Video/${video._id}`)}>
                            <div className="relative">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                    {convert(video.duration)}
                                </span>
                            </div>
                            <div className="p-4">
                                <h2 className="text-white font-semibold text-lg mb-2">{video.title}</h2>
                                <div className="flex justify-between items-center text-gray-400 text-sm">
                                    <span>{parseInt(video.views)} views</span>
                                    <span>
                                        <PopupExample content={<HiOutlineDotsVertical className='text-white text-xl cursor-pointer' />} position="left">
                                            <div className='border-b border-slate-400 p-2 cursor-pointer' onClick={()=>Navigate(`/update-video/${video._id}`)}>update video</div>
                                            <div className='p-2 cursor-pointer' onClick={()=> deleteVid(video._id)}>delete video</div>
                                        </PopupExample>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> :
                    <div className='w-full mt-3 min-h-screen p-3 space-y-3'>
                        {channelTweets && channelTweets.map((tweet, index) => (
                        <div key={index}>
                            <div className="flex justify-between " >
                                <span className="font-bold text-white">{userData.userName}</span>
                                <span>
                                    <PopupExample content={<HiOutlineDotsVertical className='text-white text-xl cursor-pointer' />} position="left">
                                        <div className='border-b border-slate-400 p-2 cursor-pointer' onClick={() => {setEditTweetId((prev) => (prev!=tweet._id)?tweet._id:null)
                                        }}>{editTweetId !== tweet._id ? "update tweet" : "cancel"}</div>
                                        <div className='p-2 cursor-pointer' onClick={()=>delTweet(tweet._id)}>delete tweet</div>
                                    </PopupExample>
                                </span>
                            </div>
                            {editTweetId === tweet._id ? 
                                <form onSubmit={handleSubmit(submitEdit)}>
                                    <Input label="content" placeholder="write the content" {...register("content", {required: true, })} />
                                    <Button type="submit" className='w-full mt-4'>Edit</Button>
                                </form> : <p className="text-white mt-2">{tweet.content}</p> 
                            }
                        </div>))}
                </div>}
            </div>
            <ToastContainer />
        </>
    );
};

export default MyDashboard;