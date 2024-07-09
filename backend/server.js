const express = require('express')
const cors = require('cors')

const db_Connect = require('./config/db_config')
require("dotenv").config()

const app = express()
const PORT =  process.env.PORT || 8000

db_Connect()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.get("/user", (req, res) => {
    res.send( "welcome to blog api 1.0" )
})
app.use("/api/v1", require('./routes/userroutes'))
app.use("/api/blog", require('./routes/Blogroutes'))
app.listen(PORT,()=>{
    console.log(`server is running at : ${PORT}`)
})