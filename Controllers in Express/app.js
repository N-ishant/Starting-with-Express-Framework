const path = require('node:path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactUsRoutes = require('./routes/contactUs')
const successRoutes = require('./routes/success')
const errorController = require('./controllers/error') 

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public'))) 

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(contactUsRoutes)
app.use(successRoutes)

app.use(errorController.get404)

app.listen(7000 , () => {
    console.log("Serer started at port 7000")
})

/*
(1) MVC is all about separations, so making sure that different parts of your code do different things and you
    clearly know which part is responsible for what.
(2) MVC stands for Models, Views and Controllers.
(3) Models are basically objects or is a part of your code that is responsible for representing your data in 
    your code, and allowing you to work with your data (things like saving data, fetching data to or from a
    file or even if it's just in memory).
(4) The views are responsible for what the user sees in the end. Views are responsible for rendering the
    right content in our html documents and sending that back to the user.
(5) View is what compiles and renders into plain HTML and what the client in most cases going to get back as a
    response of what he requested.
(6) Controllers are the connection point between the models and the views.   
(7) Controllers acts as an intermediary between the models and the views. It handles the requests, interacts
    with the model to retrieve data, and passes that data to the view for rendering. It also handles user 
    input and updates the model accordingly.
(8) Routes basically define upon which part for which http method which controller code should execute.                  
*/