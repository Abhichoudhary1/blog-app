const User = require('../models/usermodels')
const bcrypt = require('bcrypt')
const registeruser = async (req, res) => {

   const { username, email, password } = req.body
   if (!username || !email || !password) {
      res.status(400).send({
         success: false,
         msg: 'please fill all the details'
      })
   }

   const existinguser = await User.findOne({ email })
   if (existinguser) {
      res.status(400).send({
         msg: 'user already exists'
      })
   }
   

     
const user= new User({
   username, email, password 
 })
   await user.save()
   return res.status(201).send({
      success: true,
      msg: 'new user created',
      user
   })

   // const user = await User.create({
   //    name,
   //    email,
   //    password
   // })
   // if(user){
   //    res.status(201),json({
   //       id: user._id,
   //       username: user.username,
   //       email:user.email,
   //       password: user.password
   //    })
   // }
}


const getAllusers = async (req, res) => {

   try {
      const users = await User.find({})
      return res.status(200).send({
         success: true,
         message: 'all users data',
         users

      })
   } catch (error) {
      console.log(error)
      return res.status(500).send({
         success: false,
         message: 'error in get all users',
         error
      })
   }
}
const loginuser = async (req,res) =>{
    try {
       const {email , password } = req.body
       if(!email || !password ){
         return res.status(400).send({
            success : false,
            message : 'please provide all details'
         })
       }
       const user = await User.findOne({email})

       if(!user){
         return res.status(401).send({
            success:false,
            message: 'email is not registered'
         })
       }
       
       return res.status(200).send({
         success:true,
         message: 'login successfully',
         user
       })
    } catch (error) {
      console.log(error)
      return res.status(401).send({
         success:false,
         message: 'email is not registered'
      })
    }
}
module.exports = { registeruser, getAllusers,loginuser }