const express = require('express')
const { getallblogcontroller, createblogcontroller, updateblogcontroller, getsingleblog, deleteblogcontroller,createsingleblog } = require('../controller/Blogcontroller')

const router = express.Router()

router.get('/allblog', getallblogcontroller)
router.post('/createblog', createblogcontroller)
router.put('/updateblog/:id', updateblogcontroller)
router.get('/singleblog/:id', getsingleblog)
router.delete('/deleteblog/:id', deleteblogcontroller)
router.get('/getsingleblog/:id',createsingleblog)

module.exports = router