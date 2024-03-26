const path = require('node:path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactUsRoutes = require('./routes/contactUs')
const successRoutes = require('./routes/success') 

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public'))) 

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(contactUsRoutes)
app.use(successRoutes)

app.use(errorController.get404)

app.listen(3000 , () => {
    console.log("Serer started at port 3000")
})

/*
(1) In Express.js, req.params is a property used to extract route parameters. When you define routes with 
    placeholders in Express, such as /users/:userId, these placeholders are called route parameters. They are 
    parts of the URL that capture values dynamically based on the actual URL used to make the request.
(2) For example, in the route /users/:userId, :userId is a route parameter. When a request is made to 
    /users/123, Express will parse the URL and extract 123 as the value for userId.    
*/