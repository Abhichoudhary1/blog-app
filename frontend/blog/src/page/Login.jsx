import React, { useState } from 'react'
import { Typography, Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
   
      email: "",
      password: "",
  })

  const handlechange = (e) => {
      setInput((prevstate) => ({
          ...prevstate,
          [e.target.name]: e.target.value
      
      }))
  }
  const handlesubmit = async(e)=>{
      e.preventDefault()
      try {
          const {data} = await axios.post('/api/v1/login',{ email:input.email, password:input.password})
          if(data.success){
            localStorage.setItem("userId", data?.user._id)
              dispatch(authActions.login())
              alert('user registerd successfully')
              navigate('/')
          }
      } catch (error) {
          console.log(error)
      }
  
  }
  return (
    <>  
    <form onSubmit={handlesubmit}>
        <Box maxWidth={450} display="flex" flexDirection={'column'} alignItems="center" justifyContent={"center"} margin="auto" marginTop={5} boxShadow="10px 10px 20px #ccc" padding={3} borderRadius={5}>
            <Typography variant='h4' padding={3} textAlign="center">Login</Typography>

            
            <TextField placeholder='email' value={input.email} onChange={handlechange} type={'email'} name='email' required margin='normal'></TextField>
            <TextField placeholder='password' value={input.password} onChange={handlechange} type={'password'} name='password' required margin='normal'></TextField>




            <Button type='submit' variant='contained' color='primary' sx={{ borderRadius: 3, marginTop: 3 }}>submit</Button>
            <Button onClick={() => navigate('/login')} sx={{ marginTop: 3 }}>Alreadysubmit ? please login</Button>
        </Box>
        </form>
    </>
)
  
}

export default Login

