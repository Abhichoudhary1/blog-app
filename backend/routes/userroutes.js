const express = require('express')
const { registeruser, getAllusers, loginuser} = require('../controller/usercontroller')

const router = express.Router()
router.get('/get', getAllusers)
router.post('/register', registeruser)
router.post('/login', loginuser)
module.exports = router