import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useParams } from 'react-router-dom'


interface Blog{
  author: {
    name: string;
  };
  id:string;
  createdAt: string;
  title: string;
  content: string;
}
const Blog = () => {
  const {id} = useParams<{id: string}>()
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res)=>{
      setBlog(res.data)
    })
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar name={localStorage.getItem('username') || ""}/>
      <div className='flex flex-col items-center max-w-full max-h-full'>
         <BlogCard key={blog.id} varient='full' name={blog.author.name} date={blog.createdAt.split("T")[0]} title={blog.title} content={blog.content} id={blog.id}/>
      </div>
    </div>
  )
}

export default Blog