import React, { useEffect, useState } from 'react';
import {LoadingSpinner, User} from '../components/index';
import {getRegisteredUsers, getSubscribedChannels} from "../connecting/connecting"
import { useSelector } from 'react-redux';


const RegisteredUsers = () => {
  const [users , setUsers] = useState(null);
  const [regUsers , setregUsers] = useState(null);
  const [loading , setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData)
  

  useEffect(()=>{
    const fetch =async() =>{
      const id = userData._id
      try {
        const res = await getSubscribedChannels(id)
        const res1= await getRegisteredUsers({page : 1})
         if(res &&res1){
         setregUsers(res1.message);
         setUsers(res.message)
         setLoading(false)}
      } catch (error) {
        
      }
    }
    fetch()
  },[])

  const loadNew = async() =>{
    const res1= await getRegisteredUsers({limit : regUsers?.length , page : 2});
    setregUsers((prev) => [...prev, ...res1.message])
    }

    if(loading) return <LoadingSpinner/>
  if(!loading)return (
    <>
      <div className="min-h-screen text-white p-2 mx-auto max-w-7xl w-full mb-16">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-3xl font-bold mb-6">Subscribed Channels</h1>
          {users && users?.map((user , index) => (<User key={index} {...user} isSubscribed={true}/>
        ))}
          </div>
        <div className="max-w-4xl mx-auto space-y-3 mt-4">
          <h1 className="text-3xl font-bold mb-6">Users</h1>
          {regUsers && regUsers.map((user , index) => (<User key={index} {...user} />
        ))}
          </div>
          <div className='text-gray-500 hover:underline text-right cursor-pointer' onClick={()=>loadNew()}>get more users</div>
        </div>
    </>
  )
};

export default RegisteredUsers;