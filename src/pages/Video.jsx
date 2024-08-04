import React, { useState } from 'react';
import VideoCard from '../components/VideoCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { getAllVideos } from '../connecting/connecting.js';
import { addBunch } from '../store/videoSlice.js';

const Video = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [value, setValue] = useState("title");
  const [videos, setVideos] = useState(useSelector((state) => state?.video?.videos));
  const Navigate = useNavigate()
  const Dispatch = useDispatch()
  const { register, handleSubmit } = useForm();

  const submit = (data, event) => {
    event.preventDefault();
    data.search = data.search.replaceAll(" " , "-")
    data.event = value
    Navigate(`/search-video/${data.event}/${data.search}`)
  };

  const fetch = async() =>{
    await getAllVideos({limit : videos.length, page : 2})
    .then((res) => {
      Dispatch(addBunch(res.message.videos))
      setVideos((prev) => [...prev , ...res.message.videos])
      })
  }

  return (
    <>
      <form className="max-w-lg mx-auto my-5" onSubmit={handleSubmit(submit)}>
        <div className="flex">
          <button
            id="dropdown-button"
            type="button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-gray-00 border border-gray-100 rounded-s-lg hover:bg-gray-500">
            {value} &nbsp;
            <IoIosArrowDown />
          </button>
          {dropdownVisible && (
            <div
              id="dropdown"
              className="z-10 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-12">
              <ul className="py-2 text-sm text-white" aria-labelledby="dropdown-button">
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => { setValue("title"); setDropdownVisible(!dropdownVisible) }}>
                    title
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => { setValue("user"); setDropdownVisible(!dropdownVisible) }}>
                    user
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="text"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-100 bg-gray-900 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-100"
              placeholder="Search"
              required
              {...register("search", { required: true })}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-3 text-sm font-xl h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800">
              <FaSearch />
            </button>
          </div>
        </div>
      </form>
      <div className="flex flex-wrap justify-center mt-2 min-h-screen mx-auto w-full max-w-7xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos && videos?.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
        <div className='mr-2 w-full text-gray-500 hover:underline text-right cursor-pointer' onClick={() => fetch()}>
          get more videos
        </div>
      </div>
    </>
  );
};

export default Video;
