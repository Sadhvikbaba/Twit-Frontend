import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Button , Input} from './index'
import {RxAvatar} from "react-icons/rx"
import signup from "../assets/signup.png"
import {register as signUp} from '../connecting/connecting.js'


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [step,setStep] = useState(false)
    const [avatar,setAvatar] = useState()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    
    const next =(data)=>{
        if([data.userName , data.email , data.fullName].some((field) => field?.trim() === "")) setError("All fields are required");
        else setStep(true);
    }

    const submit =async (data) =>{
        if(data.password.trim() == "")setError("password is required");
        if(data.password !=data.confirmPassword)setError("password donot match");
        console.log(data);
        const formData = new FormData();
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('avatar', data.avatar[0]);
        formData.append('fullName', data.userName);
        console.log(formData);

        await signUp(formData)
        .then((res)=>console.log(res))
        .catch((res) => setError(res))
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if(file.size > 3 * 1024 * 1024){
            setError("avatar should be less than 3MB");
            return ;
        }
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAvatar(reader.result);
          }
          reader.readAsDataURL(file);
        }}

  return (
    <div className="mx-auto w-full max-w-7xl"> 
        <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-14 sm:mt-32'>
            <div className=" w-full  sm:pt-1  h-full mb-6 p-2"> 
                <img className="w-96" src={signup} alt="image1" />
            </div>
            <div className={`mx-auto w-full max-w-lg  rounded-xl lg:p-10 sm:p-0`}>
                <h2 className="text-center text-2xl font-bold leading-tight text-white">Sign up to create account</h2>
                <p className=" text-center text-base text-white">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {!step?<form  className='mt-8 p-4' onSubmit={handleSubmit(next)}>
                    <div className='space-y-5'>
                        <Input
                        label="user Name: "
                        placeholder="Enter your UserName"
                        {...register("userName", {
                            required: true,})}
                        />
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("fullName", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Button type="submit" className="w-full ">
                            Next
                        </Button>
                    </div>
                </form> : <form className='flex flex-col items-center space-y-3 p-4' onSubmit={handleSubmit(submit)}>
                    <div className='flex justify-evenly w-full my-3'>
                    <label className="cursor-pointer mt-3" onChange={handleAvatarChange}>
                        <input type="file" className="hidden" accept="image/*" {...register("avatar")}/>
                        {!avatar ? <div className="text-white font-sans font-bold text-center"><RxAvatar className="text-white font-bold text-7xl"/>avatar</div>:
                                <img src={avatar} className='rounded-full w-44 h-44'/>}
                    </label>
                    </div>
                    <Input type="password" label="password: " placeholder="Enter your password" 
                    {...register("password", {required: true,})}/>
                    <Input type="password" label="confirm password: " placeholder="confirm password" 
                    {...register("confirmPassword", {required: true,})}/>
                    <Button type="submit" className="w-full ">
                            create Account
                        </Button>
                </form>}
            </div>
        </div>
    </div>
  )
}

export default Signup

