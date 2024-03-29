const path = require('node:path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(4500 , () => {
    console.log("Serer started at port 4500")
})