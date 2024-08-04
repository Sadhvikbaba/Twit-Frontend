import React, { useState } from "react";
import {useForm} from "react-hook-form";
import {Input , Button } from "./index"
import { forgetPassword , newPassword } from "../connecting/connecting";
import { Link } from "react-router-dom";
import {BiEnvelope} from "react-icons/bi"

export default function ForgetPassword(){
    const [error, setError] = useState("");
    const [response , setResponse] = useState("");
    const [email,setEmail] = useState("");
    const {register, handleSubmit} = useForm()

    const submitEmail = (data) =>{
        forgetPassword(data)
        .then((res) => { setError("") ; setResponse(res.data) })
        .then(() => setEmail(data.email))
        .catch((res) => setError(res))
    }

    const submitPassword = (data) => {
        newPassword(data)
        .then((res) => { setError("") ; setResponse(res.data) })
        .catch((res) => setError(res))
    }
    return (
        <div className="flex items-center justify-center min-h-screen  mx-auto w-full max-w-7xl">
            <div className="relative overflow-hidden bg-gray-600 p-8 rounded-lg shadow-lg max-w-md w-full">
                {response && <p className="text-white mt-4 text-center">{response}</p>}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                {!email ? (
                    <form onSubmit={handleSubmit(submitEmail)} className="space-y-5">
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
                                },
                            })}
                        />
                        <Button
                            type="submit"
                            className="flex items-center justify-center w-full"
                        >
                            <BiEnvelope className="text-xl"/> &nbsp; next
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(submitPassword)} className="space-y-4">
                        
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            disabled
                            readOnly
                            className="cursor-not-allowed"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Input
                            label="OTP: "
                            placeholder="Enter your new OTP"
                            type="text"
                            {...register("OTP", { required: true })}
                        />
                        <Input
                            label="New Password: "
                            placeholder="Enter your new password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Submit
                        </Button>
                    </form>
                )}
                <Link
                    to="/login"
                    className="block font-medium text-red-300 mt-4 hover:underline text-right"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
