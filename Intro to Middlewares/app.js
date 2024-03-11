const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// The code imports the required modules 'express' and 'body-parser'. 
// These modules are essential for creating an Express application and handling the request body, respectively.
// 'express' is the main module for creating an Express application, and 'body-parser' is used to parse the request body.

app.use(bodyParser.urlencoded({extended:false}))
// The code sets up the 'body-parser' middleware using 'app.use()'. 
// This middleware is responsible for parsing the request body and making it accessible via 'req.body'.
// Here, 'urlencoded' option is used to parse the body as URL-encoded data.

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST">' +
             '<input type="text" name="title" placeholder="Product Title">' +
             '<input type="text" name="size" placeholder="Product Size">' +
             '<button type="submit" style="color: blue;">Add Product</button>' +
             '</form>')        
})
// This code defines another middleware function assigned to the '/add-product' path.
// When a request is made to '/add-product', this middleware function will be executed.
// It sends an HTML form to the client for adding a product.

app.post('/product', (req, res, next) => {
    console.log('Product Title:', req.body.title)
    console.log('Product Size:', req.body.size)
    res.redirect('/')
})

app.use('/' , (req, res, next) => {
    res.send("<h1>Hello World from Express.js !!</h1>")
})

app.listen(3000, () =>{
    console.log("Serer started at port 3000")
})

/*
(1) At line 28 "app.use('/', (req,res,next) ...)" , this middleware gets executed for '/', '/add-product',
    '/product' and for any path because this does not mean that the full path (part after the domain) has 
    to be a '/' but that it has to be start with that and ofcourse every route starts with just a slash.
(2) We add "app.use('/add-product', (req,res,next) ...)"  before  "app.use('/', (req,res,next) ...)" because
    as request goes from top to bottom and if we don't call next(), its not going to the next middleware.
    If we have '/add-product' request, this middleware will be reached first and since we don't call next(),
    '/' middleware will never get a chance of handling that request even though the filter '/' would matched
    that request too.
(3) If you are sending a response, this is a good indication that you never want to call next() too because
    you don't want to execute any other response related code, this won't work and will result in an error.    
*/