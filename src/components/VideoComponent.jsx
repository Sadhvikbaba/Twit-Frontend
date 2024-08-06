import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { format } from "date-fns";
import { Input, CommentCard, Button , ProfilePicture} from './index';
import { PopupExample } from "./index";
import { addComment, addVideoToPlaylist, deleteComment, getVideoComments, register, toggleCommentLike, toggleVideoLike, updateComment } from "../connecting/connecting";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";


const VideoComponent = ({
  _id,
  videoFile,
  thumbnail,
  description,
  title,
  views,
  owner,
  createdAt,
  isLiked,
  totalLikes,
  totalcomments,
  comment
}) => {
  const {register , handleSubmit} = useForm()
  const userData = useSelector((state) => state.auth.userData);
  const [playlists, setPlaylists] = useState(useSelector((state) => state.playlist.playlist))
  const [statetotalLikes , setStateTotalLikes] = useState(totalLikes)
  const [comments, setComments] = useState(comment);
  const [showComments, setShowComments] = useState(false);
  const [isLike , setIsLike] = useState(isLiked?isLiked:false)

  const handleEdit = async(commentId, content) => {
    const data = {content} 
    await updateComment(commentId , data)
    .then((res) =>{
      setComments(comments.map(comment =>
      comment?._id.toString() == commentId.toString() ? { ...comment, content : res.message.content } : comment));})
    .catch((res) => console.log(res))
  };

  const handleDelete = async(commentId) => {
    await deleteComment(commentId)
    .then((res) =>{
    setComments(comments.filter(comment => comment._id !== commentId));
    totalcomments -=1;
  })
  };

  const handleToggleLike = async(commentId) => {
    await toggleCommentLike(commentId)
    .then((res) =>{
    setComments(comments.map(comment =>
      comment._id === commentId ? { ...comment, isLiked: !comment.isLiked, totalLikes: comment.isLiked ? comment.totalLikes - 1 : comment.totalLikes + 1 } : comment
    ));})
  };

  const handleAddComment = async (data) => {
    if (!data.content.trim()){ toast("inappropriate comment") ; return ;}
    await addComment(_id ,data)
    .then((res)=>{
      res.message.isLiked= false,
      res.message.totalLikes= 0,
      res.message.isOwnComment= true
      res.message.owner={_id : userData._id , userName : userData.userName}
      setComments([...comments, res.message]);
    })
  };


  const like = async () =>{
    await toggleVideoLike(_id)
    .then((res)=>{
      setIsLike((prev)=>!prev)
      if(res.message.video)setStateTotalLikes(statetotalLikes+1)
      else setStateTotalLikes(statetotalLikes-1)
    })
  }

  const addVideo = async(data) =>{
    await addVideoToPlaylist(_id , data)
    .then((res) => toast(res.data))
  }

  const loadMoreComments = async () =>{
    await getVideoComments(_id , 2 , comments.length)
    .then((res) => setComments((prev) => [...prev , ...res.message]))
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-900 text-white md:p-4 p-2 lg:p-8" key={owner._id}>
      <div className="w-full">
        <div className="flex relative mb-4 justify-center">
          <video
            src={videoFile}
            controls
            autoPlay
            poster={thumbnail}
            className="md:w-5/6 h-auto rounded-lg max-h-64 sm:max-h-80"
          ></video>
        </div>
        <div className="flex sm:flex-row justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-sm text-gray-400">{description}</p>
            <div className="flex items-center mt-2">
              <ProfilePicture username={owner.userName} profilePictureUrl={owner?.avatar} className="w-10 h-10 rounded-full mr-2" />
              <div>
                <p className="font-bold">{owner.userName}</p>
                <p className="text-xs text-gray-400">{format(new Date(createdAt), "PPP")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between mt-4 sm:mt-0">
            <button className={`flex text-sm ${isLike ? "text-blue-500" : "text-gray-400"} mt-4 lg:mt-8`} onClick={()=>like()}>
              <FaThumbsUp className="mr-1" />{statetotalLikes}
            </button>
            <div className="flex justify-end">
              <PopupExample content={<IoMenu />} position="left">
                <div className='flex flex-col overflow-y-auto max-h-32 pr-3'>
                  <div className="text-sm text-red-100 text-center">Add to Playlist</div>
                  {playlists.map((playlist, index) => (
                    <div key={index} className='border-t border-slate-400 p-2 cursor-pointer text-center' onClick={()=>addVideo(playlist._id)}>
                      {playlist.name}
                    </div>
                  ))}
                </div>
              </PopupExample>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <p>{parseInt(views)} views</p>
          <p className="cursor-pointer bg-gray-600 rounded-xl p-1" onClick={() => setShowComments(!showComments)}>
            {totalcomments} Comments
          </p>
        </div>
        <form onSubmit={handleSubmit(handleAddComment)} className="flex">
          <Input
            label="Comment"
            placeholder="Add a comment..."
            type="text"
            {...register("content" , {required : true})}
          />
          <Button type="submit" className="rounded-l-none">Submit</Button>
        </form>
        {showComments && comments.map((comment, index) => (
          <CommentCard
            {...comment} username={comment.owner.userName} 
            isOwnComment={comment?.owner?._id.toString() == userData?._id.toString() ? true : false}
            commentId={comment._id}
            key={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleLike={handleToggleLike}
          />
        ))}
        {(showComments && totalcomments !== comments.length) && (
          <p className="text-gray-500 text-right cursor-pointer hover:underline" onClick={() => loadMoreComments()}>
            Load more comments
          </p>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default VideoComponent;
//commentcard like , comment
