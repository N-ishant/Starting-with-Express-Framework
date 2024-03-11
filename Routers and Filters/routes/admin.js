const express = require('express')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST">' +
             '<input type="text" name="title" placeholder="Product Title">' +
             '<input type="text" name="size" placeholder="Product Size">' +
             '<button type="submit" style="color: blue;">Add Product</button>' +
             '</form>')
})

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log('Product Title:', req.body.title)
    console.log('Product Size:', req.body.size)
    res.redirect('/')
})

module.exports = router

/*
(1) Routing refers to determining how an application responds to a client request to a particular endpoint,
    which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
(2) The express.Router() function is used to create a new router object. This function is used when you want
    to create a new router object in your program to handle requests.
(3) This router object is like a mini express app tied to the other express app which we can export to use it
    in app.js  so that app.js will not get bigger.
(4) A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” 
    capable only of performing middleware and routing functions.Every Express application has a built-in 
    app router. 
(5) The top-level express object has a Router() method that creates a new router object.
(6) Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post,
    and so on) to it just like an application. You can then use a router for a particular root URL in this way
    separating your routes into files or even mini-apps.     
*/