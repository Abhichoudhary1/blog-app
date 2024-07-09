import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Blogcard({title, description, image, username, time , id , isuser}) {
  const navigate = useNavigate()
  const handleedit = ()=>{
    navigate(`/blog-details/${id}`)
  }
  const handledelete = async()=>{
      try {
         const {data} = await axios.delete(`/api/blog/deleteblog/${id}`)
         if(data?.success){
          alert('blog deleted')
          navigate('/myblogs')
         }
      } catch (error) {
         console.log(error)
      }
  }
  return (
    <Card sx={{ width: "40%", margin:"auto", mt:2, padding:2, boxShadow:"5px 5px 10px #ccc", ":hover":{boxShadow:"5px 5px 10px #ccc"} }}>
      {isuser && (
        <Box display={'flex'}>
           <IconButton sx={{marginLeft:"auto"}} onClick={handledelete} >
              <DeleteIcon/>
           </IconButton>
           <IconButton onClick={handleedit}>
             <EditIcon />
           </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[400], padding:'normal'}} >
            {title}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="h6" color="text.secondary">
         Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Description : {description}
        </Typography>
      </CardContent>
      
      
        <CardContent>
  
        </CardContent>
     
    </Card>
  );
}
