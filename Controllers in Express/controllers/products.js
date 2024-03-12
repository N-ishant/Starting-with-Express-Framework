const path = require('node:path')

exports.getAddProduct = (req,res,next) => {
    res.sendFile(path.join(__dirname, '..', 'views','add-product.html'))
}

exports.postAddProduct = (req, res, next) => {
    console.log('Product Title:', req.body.title)
    console.log('Product Size:', req.body.size)
    res.redirect('/')
}