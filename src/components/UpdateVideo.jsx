import React, { useState , useEffect} from "react";
import { useForm } from "react-hook-form";
import {Input , Button, LoadingSpinner} from "./index";
import { useParams } from "react-router-dom";
import { getVideoDetails , updateVideo , togglePublishStatus} from "../connecting/connecting";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const UpdateVideo = () => {
    const {slug} = useParams()
    const [thumbnail , setThumbnail] = useState();
    const [details , setDetails] = useState(false);
    const [loading , setLoading] = useState(true);
    const {register , handleSubmit} = useForm();

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setThumbnail(reader.result);
          }
          reader.readAsDataURL(file);
        }}

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await getVideoDetails(slug);
                setDetails(res.message);
                setThumbnail(res.message?.thumbnail)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };
    
        fetchVideo();
    }, [slug]);

    const submit = async (data) => {
        try {
            if (data.isPublished.toString() !== details.isPublished.toString()) {
                const toggleResponse = await togglePublishStatus(details._id);
                console.log(toggleResponse);
            }
    
            if ([data.title, data.description].some((field) => field?.trim() === "")) {
                toast("All fields are required");
                return;
            }
    
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
    
            if (data.thumbnail && data.thumbnail.length > 0) {
                formData.append("thumbnail", data.thumbnail[0]);
            }

            await updateVideo(slug , formData)
            .then((res) => toast(res.data))
    
        } catch (error) {
            toast("An error occurred while submitting the form");
        }
    };
    
    if(loading) return <LoadingSpinner />
    if(!loading) return (
        <div className="flex flex-col items-center mb-16">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col space-y-3 items-center w-full sm:w-2/3 p-3">
                <Input label="title" placeholder="enter new title" defaultValue={details.title} 
                    {...register("title" , {required : true})}/>
                <Input label="description" placeholder="enter new description" defaultValue={details.description} 
                    {...register("description" , {required : true})}/>
                <label className="cursor-pointer mt-3 flex" onChange={handleThumbnailChange}>
                    <input type="file" className="hidden" accept="image/*" {...register("thumbnail",)}/>
                        <img src={thumbnail} alt="thumbnail"  className="w-60"/>
                </label>
                <select className="w-full bg-zinc-900 text-white cursor-pointer border-zinc-900" {...register("isPublished", {required: true, })} defaultValue={details.isPublished}>
                    <option value={true} className="border-zinc-900">public</option>
                    <option value={false} className="border-zinc-900">private</option>
                </select>
                <Button type="submit" className="w-full">Update</Button>
            </form>
            <ToastContainer/>
        </div>
    )
}