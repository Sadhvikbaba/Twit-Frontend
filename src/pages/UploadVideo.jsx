import react, { useState } from "react";
import {Input , Button, LoadingSpinner} from "../components/index";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import {MdOutlineOndemandVideo , MdFileUpload} from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publishAVideo } from "../connecting/connecting";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVideo } from "../store/videoSlice";

const UploadVideo = () => {
    const {register , handleSubmit , reset} = useForm();
    const [thumbnail , setThumbnail]= useState();
    const [loading , setLoading]= useState(false);
    const [video , setVideo]= useState();
    const Navigate = useNavigate()
    const Dispatch = useDispatch()

    const submit = (data)=>{
        if([data.name , data.description , data.isPublished].some((field) => field?.trim() === "")){toast("all fields are required");return;}
        if(!data.video){toast("all fields are required");return ;}
        if(!data.thumbnail){toast("all fields are required"); return;}
        setLoading(true);
        toast("video is uploading...")
        const formData = new FormData()
        formData.append("title",data.name);
        formData.append("description",data.description);
        formData.append("isPublished",data.isPublished);
        formData.append("videoFile",data.video[0]);
        formData.append("thumbnail",data.thumbnail[0]);
        publishAVideo(formData)
        .then((res) => {
            Dispatch(addVideo(res.message))})
        .finally(()=>{
            reset();
            Navigate("/profile-page")})
    }

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if(file.size > 2 * 1024 * 1024){
            toast.error("image should be less than 2MB");
            return ;
        }
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setThumbnail(reader.result);
          }
          reader.readAsDataURL(file);
        }}

    const handleVideoChange = (event) =>{
        const file = event.target.files[0];
        if(file?.size > 30 * 1024 * 1024){
            toast.error("Video should be less than 30MB");
            return ;
        }
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideo(reader.result);
            }
            reader.readAsDataURL(file);
        }}

        if(loading)return <LoadingSpinner/>
    
if(!loading)return(
    <div className="mt-3 flex flex-col p-2 mb-16">
        <div className="text-red-700 font-sans text-xl font-bold"> Upload Video </div>
        <div className="flex flex-row justify-center"> 
            <form onSubmit={handleSubmit(submit)} className='my-4 w-full lg:w-2/3 space-y-4'>
                <Input label="title: " type="text" placeholder="title of the video"
                {...register("name", {required: true, })}/>
                <Input label="description: " type="text" placeholder="description of the video"
                {...register("description", {required: true, })}/>
                <div className="flex sm:flex-row sm:justify-evenly flex-col items-center">
                    <label className="cursor-pointer mt-3" onChange={handleThumbnailChange}>
                        <input type="file" className="hidden" accept="image/*" {...register("thumbnail", {required: true, })}/>
                        {!thumbnail ?<div className="text-white font-sans font-bold text-center"><FaImage className="text-white font-bold text-7xl"/> thumbnail</div>:
                            <img src={thumbnail} alt="thumbnail"  className="w-60"/>}
                    </label>
                    <label className="cursor-pointer mt-3" onChange={handleVideoChange}>
                        <input type="file" className="hidden" accept="video/*" {...register("video", {required: true, })}/>
                        {!video ? <div className="text-white font-sans font-bold text-center"><MdOutlineOndemandVideo className="text-white font-bold text-7xl"/>Video</div>:
                            <video src={video} className="w-60" autoPlay/>}
                    </label>
                </div>
                <select className="w-full bg-zinc-900 text-white cursor-pointer border-zinc-900" {...register("isPublished", {required: true, })}>
                    <option value="true" className="border-zinc-900">public</option>
                    <option value="false" className="border-zinc-900">private</option>
                </select>
                <Button type="submit" className="w-full mt-4 flex justify-center text-base">Upload <MdFileUpload className="mt-1"/></Button>
            </form>
        </div>
        <ToastContainer />
    </div>
    )
}

export default UploadVideo