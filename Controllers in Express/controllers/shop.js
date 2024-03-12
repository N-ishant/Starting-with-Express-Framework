const path = require("node:path")

exports.getShop = (req,res,next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
}