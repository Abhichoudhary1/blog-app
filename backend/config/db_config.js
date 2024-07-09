const mongoose = require('mongoose')

const db_Connect = async () => {
    try {
       const conn =  await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb is connected ${conn.connection.host}`)
    } catch (error) {
         console.log(`mongodb is not connected : ${error.message}`)
    }
}

module.exports = db_Connect