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

app.listen(5000 , () => {
    console.log("Serer started at port 5000")
})

/*
(1) Static HTML Page is a basic web page made with HTML code that doesn't change or interact with users. It's 
    like a digital poster that displays the same information to everyone who visits it.
(2) Static web pages are made of "fixed code", and unless the site developer makes changes, nothing will 
    change on the page.
(3) A dynamic HTML page is a web page that uses HTML, CSS, and JavaScript to create interactive and changing 
    content. Unlike static HTML pages, which display fixed content that doesn't change unless the page is 
    reloaded, dynamic HTML pages can update content dynamically in response to user actions or external events
    without needing a full page reload.   
(4) Thus far we are always returning static html pages and typically is not what we do in real applications
    because we don't just have static html code most of the time. Instead it is pretty common that we have 
    some data managed on our server which we want to dynamically output in the html code we send back to users.
    Later we will also do that in a database.
(5) So, these html pages which we are returning should now become more dynamic and actually contain some 
    content that is dynamically entered into them on the server, so that if we had additional data on the
    server, we would send back a different html page with different content. And for this we will use 
    Templating Engine. 
(6) For putting dynamic content into our html pages, we would use Templating Engines.           
*/