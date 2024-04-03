const path = require('node:path')

exports.getContactUs = (req,res,next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contactUs.html'))
}

exports.postContactUs = (req,res,next) => {
    console.log(req.body)
    res.redirect('/success')
}