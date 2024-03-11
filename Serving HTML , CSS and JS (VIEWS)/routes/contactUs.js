const path = require('node:path')
const express = require('express')
const router = express.Router()

router.get('/contactus', (req,res,next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contactUs.html'))
})

router.post('/contactus', (req,res,next) => {
    console.log(req.body)
    res.redirect('/success')
})

module.exports = router