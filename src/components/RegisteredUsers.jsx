import React  , {useState} from 'react';
import ProfilePicture from './ProfilePicture';
import { useNavigate } from 'react-router-dom';
import { toggleSubscription } from '../connecting/connecting';

const User = ({_id , userName , avatar , isSubscribed}) => {
  const Navigate = useNavigate();
  const [isSubscribe , setIsSubscribe] = useState(isSubscribed);

  const Subscribe = async (id)=>{
    await toggleSubscription(id)
    .then((res) => {
      setIsSubscribe((prev) => !prev)
    })
  }
  return (
      <div className="bg-gray-800 p-4 rounded-lg flex items-center" >
        <ProfilePicture username={userName} profilePictureUrl={avatar} className="w-16 h-16 rounded-full mr-4 text-xl" special="min-w-16"/>
        <div className='sm:flex items-center justify-between w-full'>
          <h2 className="text-xl font-semibold text-center cursor-pointer"onClick={()=> Navigate(`/user-dashboard/${userName}`)}>{userName}</h2>
          <p className={`mt-2 md:min-w-32 md:h-12 flex items-center justify-center px-2 py-2 text-center rounded-full font-light text-sm ${isSubscribe ? 'bg-green-500' : 'bg-red-500'} cursor-pointer`}
          onClick={()=>Subscribe(_id)}
          >
            {isSubscribe ? 'Subscribed' : 'Subscribe'}
          </p>
        </div>
      </div>
        
  )
};

export default User;


