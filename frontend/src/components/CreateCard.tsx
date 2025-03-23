import React, { useState } from 'react'
import { BACKEND_URL } from '../config';
import axios from 'axios';

const CreateCard = ({text}:{text:string}) => {

    const [title,setTitle] =useState("");
    const [content,setContent] = useState("");

    const CreateF =()=>{
      axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content
        },{
            headers:{
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            console.log(res.data)
            alert('Blog Created Successfully')
            setTitle('');
            setContent('');
        })
    }

  return (
    <div className='max-w-3xl'>
        <div className='flex'>
        <div className='h-20 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 border border-black rounded-full" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path></svg>
        </div>
        <div>
            <input
              type="text"
              className='border-l-2 border-blue-gray-50 mx-2 w-full h-20 text-5xl focus:outline-none p-3'
              placeholder='Title'
              onChange={(e)=>{
                  setTitle(e.target.value);
              }}
              value={title}
            />
            <input
              type="text"
              className='mx-3 w-full h-10 text-xl focus:outline-none p-3'
              placeholder='Tell your story...'
              onChange={(e)=>{
                  setContent(e.target.value);
              }}
              value={content}
            />
        </div>
        </div>
        <button type="button" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} onClick={CreateF} >{text}</button>
    </div>
  )
}

export default CreateCard