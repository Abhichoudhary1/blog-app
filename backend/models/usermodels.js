const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please fill the details']
    },
    email:{
        type:String,
        required:[true,'please fill the details']
    },
    password:{
        type:Number,
        required:[true,'please fill the details']
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'blog',
        required:[true, 'please enter blogs name']
    }]
},{timestamps:true})

module.exports = mongoose.model('user', userSchema)