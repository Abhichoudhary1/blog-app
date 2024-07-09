import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blogcard from '../component/Blogcard'
const Userblog = () => {
  const [blogs,setBlogs]= useState([])
  const getuserblogs = async()=>{
   try {
      const id = localStorage.getItem('userId')
       const {data} = await axios.get(`/api/blog/getsingleblog/${id}`)
       if(data?.success){
        setBlogs(data?.userblog.blogs)
       }
    
   } catch (error) {
     console.log(error)
   }
  }
  useEffect(()=>{
     getuserblogs()
  },[])
console.log(blogs)
  return (
    <div>
      { blogs && blogs.length > 0 ? (blogs && blogs.map((blog)=> <Blogcard title={blog.title} id={blog._id} 
           isuser={localStorage.getItem("userId") === blog.users._id}
      description={blog.description} image={blog.image} username={blog.users.username} time={blog.createdAt}/>)) : (<>
         <h1>you havent create a blog</h1>
      </>)
         
      }
    </div>
  )
}

export default Userblog
