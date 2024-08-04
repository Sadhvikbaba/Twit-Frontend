import React ,{ useState } from "react";
import {useForm} from "react-hook-form";
import {Input , Button} from "./index"
import { useDispatch, useSelector } from "react-redux";
import { changePassword, updateAccount } from "../connecting/connecting";
import { updateaccount } from "../store/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const Settings = () => {

    const [updateDetails , setUpdateDetails] = useState(false)
    const [updatePassword , setUpdatePassword] = useState(false)
    const {register , handleSubmit , reset} = useForm()
    const details = useSelector((state) => state.auth.userData)
    const Dispatch = useDispatch();
    const Navigate = useNavigate()

    const submitDetails = async(data) => {
        await updateAccount(data)
        .then((res)=>{
            Dispatch(updateaccount(data))
            toast(res.data)
        })
        reset()
    }
    const submitPassword = async (data) => {
        console.log(data);
        await changePassword(data)
        .then((res) =>{
            console.log(res);
            toast(res.data)
        })
        .catch((res) => toast(res))
        reset()
    }

    return(
    <div className="mt-5 text-white p-2 w-full">
        <h1 className="font-bold text-xl cursor-pointer" onClick={() => setUpdateDetails((!updateDetails))}>update Details</h1>
        <div className="w-full flex flex-col items-center">
        {updateDetails && <form onSubmit={handleSubmit(submitDetails)} className="mt-2 space-y-3  sm:w-2/3 w-full p-2">
            <Input label="fullname" placeholder="enter fullname" {...register("fullName")} defaultValue={details.fullName}/>
            <Input label="Email: " placeholder="Enter your email" type="email" defaultValue={details.email}
                {...register("email", {
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",}})}/>
            <Button type="submit" className="w-full ">Update</Button>
        </form>}
        </div>
        <h1 className="font-bold text-xl cursor-pointer mt-3" onClick={() => setUpdatePassword((!updatePassword))}>update password</h1>
        <div className="w-full flex flex-col items-center">
        {updatePassword && <form onSubmit={handleSubmit(submitPassword)} className="mt-2 space-y-3  sm:w-2/3 w-full p-2">
            <Input label="old Password" placeholder="enter your old password" {...register("oldPassword" , {required : true})}/>
            <Input label="new Password" type="password" placeholder="Enter your new password"
                {...register("newPassword", {required : true})}/>
            <Button type="submit" className="w-full ">Update</Button>
        </form>}
        </div>
        <h1 className="font-bold text-xl cursor-pointer mt-3" onClick={() => Navigate("/description")}>Help</h1>
        <h1 className="font-bold text-xl cursor-pointer mt-3" onClick={() => Navigate("/description")}>Guide</h1>
        <h1 className="font-bold text-xl cursor-pointer mt-3" onClick={() => Navigate("/contact-us")}>Contact us</h1>
        <h1 className="font-bold text-xl cursor-pointer mt-3" onClick={() => Navigate("/contact-us")}>Report</h1>
        <h1 className="font-bold text-xl cursor-pointer mt-3" onClick={() => Navigate("/description")}>Terms and conditions</h1>
        <ToastContainer />
    </div>
    )
}