const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'enter the title']
    },
    description:{
        type:String,
        required:[true, 'enter the description']
    },
    image:{
        type:String,
        required:[true, 'enter the image']
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,'user id is  required']
    } 
},{
    timestamps:true
})

module.exports = mongoose.model('blog', blogSchema)