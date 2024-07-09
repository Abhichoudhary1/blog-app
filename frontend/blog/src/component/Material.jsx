import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../redux/store'
const Material = () => {
    const login = useSelector((state) => state.islogin)
    
    console.log(login)
    const [value, setValue] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handlelogout = ()=>{
        try {
            dispatch(authActions.logout())
            alert('logout successfully')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>
                        Blog app
                    </Typography>
                    {
                        login && <>
                         <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
                      
                      <Tabs textColor='inherit' value={value} onChange={(e) => setValue(e.target.value)}>
                          <Tab label="blogs" LinkComponent={Link} to="/blogs" />
                          <Tab label="my-blogs" LinkComponent={Link} to="/myblogs" />
                          <Tab label="createblog" LinkComponent={Link} to="/createblog" />
                          
                      </Tabs>
                  

          </Box>
                        </>
                    }
                   
                    <Box display={'flex'} marginLeft={'auto'}>
                         {
                            !login && (
                            <>
                             <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login" > login</Button>
                             <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register">register</Button>
                            </>
                            )
                         }
                        
                        {
                            login && (
                                <Button sx={{ margin: 1, color: 'white' }} onClick={handlelogout}>logout</Button>                            )
                        }
                       


                    </Box>
                </Toolbar>

            </AppBar>
        </>

    )
}

export default Material
