import React, { useState } from 'react';
import {TweetCard} from '../components/index';
import { useForm } from 'react-hook-form';
import {FaRegPlusSquare} from "react-icons/fa";
import {Input, Button} from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { getTweets , createTweet } from '../connecting/connecting';
import { addTweets } from '../store/tweetSlice';


const Tweet = () => {
  const [newTweet , setNewTweet] = useState(false);
  const [page , setPage] = useState(2);
  const [tweets,setTweets] =useState(useSelector((state) => state.tweet.tweets));
  const userData = useSelector((state)=>state.auth.userData);
  const Dispatch = useDispatch()

  const {register , handleSubmit} = useForm();

  const submit = async(data)=>{
    await createTweet(data)
    .then((res)=> {
      res.message.isLiked = false
      res.message.totalLikes = 0
      res.message.owner=[{avatar : userData.avatar , userName : userData.userName}]
      Dispatch(addTweets(res.message))
      setTweets((prev) => [...prev,res.message])
      setNewTweet(false)
    })
  }

  const getMoreTweets = async ()=>{
    await getTweets({page})
    .then((res)=>{
      setTweets((prev)=> [...prev , ...res.message])
      if(res.message.length)setPage((prev)=>prev+=1)
    })
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 mb-16">
      <div className='flex justify-between w-full text-white text-lg'>
        <div>Tweets</div>
        <div ><FaRegPlusSquare className="cursor-pointer text-white" onClick={()=> setNewTweet((prev) => !prev)}/></div>
      </div>
      {newTweet &&<div className="flex flex-row justify-center space-y-4"> 
            <form onSubmit={handleSubmit(submit)} className='my-4 w-full lg:w-2/3 text-white'> <div className='mb-2'>share your thoughts...</div>
                <Input label="content: " type="text" placeholder="write a tweet"
                {...register("content", {required: true, })}/>
                <Button type="submit" className="w-full mt-4">create</Button>
            </form>
        </div>}
        {tweets && tweets.map((tweet , index) => <TweetCard {...tweet} key={index}
            avatar={tweet.owner[0].avatar} username={tweet.owner[0].userName}/>)}
          <div className='ml-auto w-36 text-gray-500 hover:underline cursor-pointer mt-3' onClick={()=>getMoreTweets()}>
            get more tweets
          </div>
    </div>
  );
};

export default Tweet;
