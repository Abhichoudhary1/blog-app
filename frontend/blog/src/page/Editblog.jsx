import React , {useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
const Editblog = () => {
    const [blog,setBlog] = useState({})
    const navigate = useNavigate()
    const id = useParams().id
    const[input,setinput]= useState({
        
    })
    const getblogdetail = async()=>{
        try {
            const {data} = await axios.get(`/api/blog/singleblog/${id}`)
            if(data?.success){
                setBlog(data?.getsingle)
                setBlog({
                    title: data?.getsingle.title,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getblogdetail()
    },[id])
    console.log(blog)

   const handlechange =(e)=>{
      setinput(prevstate =>({
          ...prevstate,
          [e.target.name]:e.target.value,
      }))
   }
    const handlesubmit = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.put(`/api/blog/updateblog/${id}`,{
                title:input.title,
                description:input.description,
                image:input.image,
                users:id
            })
            if(data?.success){
                alert('blog updated')
                navigate('/myblogs')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
       <form onSubmit={handlesubmit}>
        <Box width={'40%'} border={3} borderRadius={10} padding={3} display={'flex'} alignItems={'center'} flexDirection={'column'} margin="auto" boxshadow={'10px 10px 20px #ccc'} marginTop="30px">
            <Typography variant='h2' textAlign={"center"} fontWeight="bold" padding={3} color="gray">
               edit the blog
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

         <Button type='submit' color='warning' variant='contained'>update</Button>
        </Box>

      </form>
    </div>
  )
}

export default Editblog
