import React from 'react'
import Material from './component/Material'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Blog from './page/Blog'
import Login from './page/Login'
import Register from './page/Register'
import Userblog from './page/Userblog'
import Createvblog from './page/Createvblog'
import Editblog from './page/Editblog'
const App = () => {
  return (
    <>

    <BrowserRouter>
    <Material/>
      <Routes>
     
      <Route  path='/' element={<Blog/>}/>
      <Route  path='/blogs' element={<Blog/>}/>
      <Route  path='/myblogs' element={<Userblog/>}/>
      <Route  path='/createblog' element={<Createvblog/>}/>
      <Route  path='/blog-details/:id' element={<Editblog/>}/>
      
      <Route  path='/login' element={<Login/>}/>
      <Route  path='/register' element={<Register/>}/>
      </Routes>
      
    
    </BrowserRouter>
    </>
   
   
  )
}

export default App
