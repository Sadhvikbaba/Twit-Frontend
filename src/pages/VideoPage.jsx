import React, { useEffect, useState }  from 'react';
import {LoadingSpinner, VideoComponent} from '../components/index';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoById , getVideoComments} from '../connecting/connecting';
import { deleteVideo } from '../store/videoSlice';
import { useDispatch } from 'react-redux';


function VideoPage() {
  const {slug} = useParams();
  const [data , setData] = useState(null);
  const [comment , setComments] = useState(null);
  const [loading , setLoading] = useState(true);
  const Dispatch = useDispatch()
  const Navigate = useNavigate()

  useEffect(()=>{
    const fetchVideo = async() =>{
      await getVideoById(slug)
      .then((res) => setData(res.message))
      .catch((res) =>{
        Dispatch(deleteVideo(slug))
        Navigate("/videos")
      })
      await getVideoComments(slug , 1)
      .then((res) => setComments(res.message))
      .then(()=>setLoading(false))
    }
    fetchVideo()
  } ,[])

  if(loading)return <LoadingSpinner/>

  if(!loading)return (
    <div className='mb-16'>
      <VideoComponent {...data } comment={comment} key={data?._id}/>
    </div>
  );
}

export default VideoPage;
