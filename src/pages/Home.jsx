import React, {useEffect, useState} from 'react'
import { FaGooglePlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import eagle from "../assets/eagle.png";

export function Home() {

  
return (
    <>
        <div className="mx-auto w-full max-w-7xl mb-16 sm:-mt-10"> 
        <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-14 sm:mt-32'>
            <div className=" w-full  sm:pt-1  h-full mb-6 sm:ml-0"> 
                <img className="w-96 sm:h-full sm:w-full" src={eagle} alt="image1" />
            </div>
            <div className="flex flex-col  items-center mx-auto w-full max-w-lg rounded-xl lg:p-10 sm:p-0 text-white  justify-center">
                <h2 className="text-4xl font-bold sm:text-5xl">
                    Welcome to &nbsp;
                    <span className=" sm:block text-3xl text-right mr-5">Twit</span>
                </h2>
                <div className='mt-4'>
                    <Link
                        className="inline-flex text-white items-center text-lg px-6 py-3 font-medium bg-red-700 rounded-lg hover:opacity-75"
                        to="/login">
                        <FaGooglePlay className='text-2xl'/> &nbsp; Get Started
                    </Link>
                </div>
            </div>
        </div>
        </div>
    </>
    )
}
