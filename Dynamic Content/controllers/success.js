const path = require('node:path')

exports.getSuccess = (req,res,next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'success.html'))
}