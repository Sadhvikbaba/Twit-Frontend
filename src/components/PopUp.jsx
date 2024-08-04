import React from 'react';
import Popup from 'reactjs-popup';

export const PopupExample = ({children , content , position,  width ="w-full" , height = "h-full" , required=true}) => {

    return(
    <div className='w-full mx-auto'>
    <Popup trigger={<button>{content}</button>} position={`${position} center`}>
        {required && <div className={`${width} ${height} h-full p-3 bg-gray-800 rounded-xl text-white`}>
          {children}
        </div>}
    </Popup>
  </div>
);}