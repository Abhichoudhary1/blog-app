import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import Blogcard from '../component/Blogcard'
const Blog = () => {
  const[blogs, setBlogs]= useState([])

  const getblogs = async()=>{
     try {
      const {data} = await axios.get('/api/blog/allblog')
      if(data ?. success){
         setBlogs(data?.blog)
      }
     } catch (error) {
       console.log(error)
     }
  }

  useEffect(()=>{
getblogs()
  },[])
  return (
    <div>
      {
        blogs && blogs.map((blog)=> <Blogcard title={blog?.title} id={blog._id} isuser={true} description={blog?.description} image={blog?.image} username={blog?.users?.username} time={blog?.createdAt}/>)
      }
    
    </div>
  )
}

export default Blog
