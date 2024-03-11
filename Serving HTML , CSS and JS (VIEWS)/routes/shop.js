const path = require("node:path")
const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
    //res.sendFile('./views/shop.html')    // relative path   // Error
    //res.sendFile('shop.html', { root: './views' })
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
})

module.exports = router

/*
(1) res.sendFile() allows us to send back a file to the user and it automatically sets the Content-Type
    response header field.
(2) res.sendFile() transfers the file at the given path. Sets the Content-Type response HTTP header field
    based on the filename’s extension. Unless the root option is set in the options object, path must be an 
    absolute path/full path to the file.
(3) Error in line 6 : TypeError: path must be absolute or specify root to res.sendFile()    
(4) Error in Line 6 : The error we're encountering is due to the fact that res.sendFile() expects an absolute
    path or a path relative to the root option. In your case, you're providing a relative path 
    ('./views/shop.html'), which is causing the error.
(5) In the context of res.sendFile(), the "root option" refers to the option you can pass as the second 
    parameter to specify the root directory for resolving relative paths. When using res.sendFile(), you can 
    provide a second argument, like "Line 7". In "Line 7" example, the root option is set to ./views, and the
    file path 'shop.html' is considered relative to that root directory. This is an alternative approach to 
    using an absolute path.
(6) join() joins all given path segments together using the platform specific seperator as a delimiter and
    then normalizes the resulting path.  
(7) __dirname is a global variable made available by nodeJs which simply holds the absolute/full path on
    our Operating System to this Project Folder. __dirname gives us the path of a folder to a file in which
    we use it i.e __dirname points to the routes folder in this case.
(8) '..' means go back one level of a path.           
*/