import React from 'react'
import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks'
import { Link } from 'react-router-dom';

interface Blog {
  author: {
    name: string;
  };
  id:string;
  createdAt: string;
  title: string;
  content: string;
  draft: boolean;
}
const Blogs = () => {
  const {loadings, blogs} = useBlogs()
  if(loadings) return <div>Loading...</div>
  if (!blogs) return <div>No blogs available.</div>
  return (
    <div>
      <AppBar name={localStorage.getItem('username') || ""}/>
      <div className='flex flex-col items-center max-w-full max-h-full'>
      {Array.isArray(blogs) ? blogs.filter((blog:any)=>blog.draft==false).map((blog:Blog)=>{
        return <Link to={`/blog/${blog.id}`}><BlogCard key={blog.id} varient='half' name={blog.author.name} date={blog.createdAt.split("T")[0]} title={blog.title} content={blog.content} id={blog.id}/></Link>
      }) : <div>Blogs data is not in the expected format.</div>}
      </div>
    </div>
  )
}

export default Blogs