
const mongoose = require('mongoose')
const blogModel = require('../models/Blogmodels')
const usermodels = require('../models/usermodels')



const getallblogcontroller = async (req, res) => {
    try {
        const blog = await blogModel.find({}).populate('users')
        if (!blog) {
            res.status(401).send({
                message: 'no blog is found',
                success: false,

            })
        }
        res.status(201).json({
            message: 'get all blog',
            success: true,
            blog,
            Blogcount: blog.length
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: 'errorr in getall blog',
            success: false
        })
    }
}

const createblogcontroller = async (req, res) => {
    try {
        const { title, description, image, users} = req.body
        if (!title || !description || !image || !users ) {
            res.status(400).send({
                message: 'error in createblog',
                success: false,
            })
        }
        const existinguser = await usermodels.findById(users)
        if(!existinguser){
            res.status(401).send({
                success:false,
                message:'not existing users'
            })
        }


        const newblog = new blogModel({title, description, image, users})
        const session = await mongoose.startSession()
        session.startTransaction()
        await newblog.save({session})
        existinguser.blogs.push(newblog)
        await existinguser.save({session})
        await session.commitTransaction()
        await newblog.save()
        
        return res.status(200).send({
            success: true,
            message: 'welcome to blog',
            newblog
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'error in createblog',
            success: false,
            error
        })
    }

}
const updateblogcontroller = async (req, res) => {
    try {
        // const { id } = req.params
        // const{title,description,image} = req.body
        // const blog = await blogModel.findByIdAndUpdate(id, req.body , {new:true} )
        // res.status(201).send({
        //     message: true,
        //     blog
        // })

        const updateblog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {new:true})

        res.status(200).json(updateblog)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'error in createblog',
            success: false,
            error
        })
    }
}
const getsingleblog = async (req,res) => {
    try {
        const getsingle = await blogModel.findById(req.params.id)
        if(!getsingle){
            res.status(400).send({
                message:'failed to get id',
                success:false
            })
        }
        res.status(200).send({
            success:true,
            getsingle
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'error in createblog',
            success: false,
            error
        })
    }

}

const deleteblogcontroller = async (req,res) => {
    try {

       const blog = await blogModel.findOneAndDelete(req.params.id).populate("users")
       await blog.users.blog.pull(blog)
       await blog.users.save()

   
        res.status(200).send({
            success:true,
            message:'id deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'error in createblog',
            success: false,
            error
        })
    }
}
const createsingleblog = async (req,res)=>{
 try {
    const userblog = await usermodels.findById(req.params.id).populate("blogs")
    if(!userblog){
        res.status(400).send({
            success:false,
            message:"failed to get single blog"
        })
    }
    return res.status(200).send({
    success:true,
    message:"user blog",
    userblog
    })
 } catch (error) {
    console.log(error)
        res.status(400).send({
            message: 'error in createblog',
            success: false,
            error
        })
 }
}

module.exports = { getallblogcontroller, createblogcontroller, updateblogcontroller, getsingleblog, deleteblogcontroller, createsingleblog}