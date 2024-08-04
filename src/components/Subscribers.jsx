import React , {useEffect , useState} from "react";
import {LoadingSpinner, User} from "./index"
import {getUserChannelSubscribers} from "../connecting/connecting"; //subscriberId
import { useParams } from "react-router-dom";

export const Subscribers = () => {
  const {slug} = useParams()
  const [subscribers , setSubscribers] = useState(null)
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    const fetchSubscribers = async() => {
        try {
          const res = await getUserChannelSubscribers(slug)
          setSubscribers(res.message)
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      }
      fetchSubscribers()
    },[])

    if(loading)return <LoadingSpinner/>

    if(!loading)return (
        <div className="min-h-screen text-white p-2 mx-auto max-w-7xl w-ful">
            <h1 className="text-3xl font-bold mb-6 cursor-pointer">Subscribers</h1>
            <div className="flex flex-wrap flex-col  mt-2 min-h-screen mx-auto w-full max-w-7xl space-y-3">
              {subscribers && subscribers.map((user , index) => (<User key={index} {...user}/>))}
            </div>
        </div>
    )
}
