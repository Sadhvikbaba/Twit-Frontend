import React, { useState , useEffect } from 'react';
import {VideoCard , TweetCard , ProfilePicture, LoadingSpinner} from '../components/index';
import { useParams ,useNavigate} from 'react-router-dom';
import { getUserChannelProfile, getChannelStats, getUserTweets, getChannelVideos , toggleSubscription} from '../connecting/connecting';
import defaultCoverImage from "../assets/defaultCoverImage.png"
const UserDashboard = ({
    coverImage= defaultCoverImage,
}) => {
    const [loading,setLoading]= useState(true)
    const [show, setShow] = useState(true);
    const [channelStats, setChannelStats] = useState();
    const [channelVideos, setChannelVideos] = useState();
    const [channelCounts, setChannelCounts] = useState();
    const [channelTweets, setChannelTweets] = useState();
    const {slug} = useParams()
    const Navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          let data = null
            try {
                const res = await getUserChannelProfile(slug);
                if(res){
                  data = res.message
                  setChannelCounts(res.message);}
                const [statsRes, tweetsRes, videosRes] = await Promise.all([
                    getChannelStats(data._id),
                    getUserTweets(data._id),
                    getChannelVideos(data._id)
                ]);

                setChannelStats(statsRes.message);
                setChannelTweets(tweetsRes.message);
                setChannelVideos(videosRes.message);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const Subscribe = async () =>{
      await toggleSubscription(channelCounts._id)
      .then((res) => {
          setChannelCounts({...channelCounts , isSubscribed : !channelCounts.isSubscribed})})
  }

  if(loading) return <LoadingSpinner/>
  if(!loading)return (
    <>
      {channelCounts && <div className="flex flex-wrap  mt-2 min-h-screen mx-auto w-full max-w-7xl">
        <div className="relative w-full h-64">
          <img src={channelCounts?.coverImage || coverImage} alt="Cover" className="w-full md:h-full object-cover -z-10 h-2/3" />
          <div className="absolute -bottom-1 md:-bottom-5 left-6 transform sm:translate-y-1/2">
          <ProfilePicture username={channelCounts?.userName} profilePictureUrl={channelCounts?.avatar} 
                            className="w-32 h-32 lg:w-48 lg:h-48  rounded-full border-4 border-zinc-900 text-6xl" />
          </div>
        </div>
        <div className="max-w-4xl p-4  md:mt-16">
          <div className="text-left mt-8 md:mt-14 lg:mt-8">
            <h1 className="text-4xl font-bold text-red-700">{channelCounts?.fullName}</h1>
            <p className="text-gray-400">@{channelCounts?.userName}</p>
            <p className="text-gray-400">{channelCounts?.email}</p>
            <div className="mt-4" onClick={() => Subscribe()}>
              <span className={`px-4 py-2 rounded-full ${channelCounts?.isSubscribed ? 'bg-green-500' : 'bg-red-500'} cursor-pointer`}>
                {channelCounts?.isSubscribed ? 'Subscribed' : 'Subscribe'}
              </span>
            </div>
          </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ">
              <div className="bg-gray-800 p-6 rounded-lg text-center cursor-pointer" onClick={() => Navigate(`/subscribers/${channelCounts?._id}`)}>
                <h2 className="text-xl font-semibold text-red-400">{channelCounts.subscribersCount}</h2>
                <p className="text-gray-400">Subscribers</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h2 className="text-xl font-semibold text-red-400">{channelCounts?.subscribedToCount}</h2>
                <p className="text-gray-400">Subscribed To</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h2 className="text-xl font-semibold text-red-400">{channelStats.totalLikes}</h2>
                <p className="text-gray-400">Total Likes</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h2 className="text-xl font-semibold text-red-400">{parseInt(channelStats.totalViews)}</h2>
                <p className="text-gray-400">Total Views</p>
              </div>
            </div>
        </div>
      </div>}
      <div className="mt-2 min-h-screen w-full max-w-7xl mb-20">
        <div className='flex justify-evenly text-white w-full text-lg font-sans max-h-12 mb-7'>
            <div className='cursor-pointer hover:underline' onClick={() => setShow(true)}>videos</div>
            <div className='cursor-pointer hover:underline' onClick={() => setShow(false)}>tweets</div>
        </div>
      {show ?<div className='flex items-start justify-center'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {channelVideos && channelVideos?.map((video , index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </div>:<div className='w-full'>
        {channelTweets && channelTweets?.map((tweet , index)=><TweetCard key={index} {...tweet} username={channelCounts?.userName}/>)}
        </div>}
    </div>
  </>
  );
};

export default UserDashboard;
