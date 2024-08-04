import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import {Input , Button} from "./index.js"
import {login as authLogin} from "../store/authSlice"
import {video} from "../store/videoSlice.js"
import {setTweets} from "../store/tweetSlice.js"
import {setPlaylist} from "../store/playlistSlice.js"
import { useDispatch } from 'react-redux'
import { login as connecting , getAllVideos , getTweets, getUserPlaylists} from '../connecting/connecting.js'
import loginImg from "../assets/loginImg.png"


function Login() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const login = async (data)=>{
        let id = null
        await connecting(data)
        .then((res) => {
            id = res.message.user?._id.toString();
            dispatch(authLogin(res.message.user))})
        .catch((res) => setError(res))

        await getAllVideos({page : 1})
        .then((res) => dispatch(video(res.message.videos)))
        .catch((res) => console.log(res))

        await getTweets({page : 1})
        .then((res) => dispatch(setTweets(res.message)))
        .catch((res) => console.log(res))

        await getUserPlaylists(id)
        .then((res)=> dispatch(setPlaylist(res.message)))
        .then(() => navigate("/videos"))
        .catch((res)=>console.log(res))

    }

  return (
    <div className="mx-auto w-full max-w-7xl"> 
        <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-14 sm:mt-32'>
            <div className=" w-full  sm:pt-1  h-full mb-6"> 
                <img className="w-96 cursor-pointer drop-shadow-2xl " src={loginImg} alt="image1" />
            </div>
            <div className={`mx-auto w-full max-w-lg rounded-xl lg:p-10 sm:p-0`}>
                <h2 className="text-center text-2xl font-bold leading-tight text-white">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-white">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8 p-4'>
                <div className='space-y-5 text-center'>
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                        matchPattern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <div className='text-right text-sm text-gray-500'>
                    <Link
                        to="/forget-password"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Forget Password
                    </Link>
                    </div>
                    <Button type="submit" className="w-full">
                    Sign in
                    </Button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login