import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Createvblog = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate()
    const[input,setinput]= useState({
        title:"",
        description:"",
        image:"",
    })
   const handlechange =(e)=>{
      setinput(prevstate =>({
          ...prevstate,
          [e.target.name]:e.target.value,
      }))
   }
    const handlesubmit = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/blog/createblog',{
                title:input.title,
                description:input.description,
                image:input.image,
                users:id
            })
            if(data?.success){
                alert('blog created')
                navigate('/myblogs')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
      <form onSubmit={handlesubmit}>
        <Box width={'40%'} border={3} borderRadius={10} padding={3} display={'flex'} alignItems={'center'} flexDirection={'column'} margin="auto" boxshadow={'10px 10px 20px #ccc'} marginTop="30px">
            <Typography variant='h2' textAlign={"center"} fontWeight="bold" padding={3} color="gray">
               create a posts
            </Typography>
            <InputLabel sx={{mb:1, mt:2, fontSize:"24px", fontWeight:"bold"}}>
            Title
            </InputLabel>
            <TextField name='title'  value={input.title} onChange={handlechange} required variant='outlined' margin='normal'/>
            <InputLabel sx={{mb:1, mt:2, fontSize:"24px", fontWeight:"bold"}}>
            Description
            </InputLabel>
            <TextField name='description'  value={input.description} onChange={handlechange}  required variant='outlined' margin='normal'/>
            <InputLabel sx={{mb:1, mt:2, fontSize:"24px", fontWeight:"bold"}}>
            Image URL
            </InputLabel>
            <TextField name='image'  value={input.image} onChange={handlechange} variant='outlined'  required margin='normal'/>

         <Button type='submit' color='primary' variant='contained'>submit</Button>
        </Box>

      </form>
    </>
  )
}

export default Createvblog
