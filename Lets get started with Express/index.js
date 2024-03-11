const express = require('express')   // Express package exports a "function" in the end
const app = express()  // Therefore we execute Express Package as a function

// Middleware Functions
app.use((req, res, next) => {
    console.log("In the Middleware!")
    next()  // Allows the request to continue to the next middleware in line
})

app.use((req, res, next) => {
    console.log("In another Middleware!")
    res.send("<h1>Hello World from Express.js !!</h1>")
})

app.listen(3000, () =>{
    console.log("Serer started at port 3000")
})

/*
(1) app is an instance of express.
(2) The express() function is a top-level function exported by the express module.
(3) The code(at line 2) creates a new Express application by calling the 'express()' function, and the
    resulting application object is assigned to the variable 'app'.
(4) This 'app' object is the main interface for configuring routes and handling HTTP requests.
(5) "Middleware" means that an incoming request is automatically funneled through a bunch of functions by
    expressJs. So, instead of just having one request handler(as was in nodeJs), you will actually have a 
    possibility of hooking in multiple functions which the request will go through until you send a response.
    This allows us to split our code into multiple blocks or pieces instead of having one huge function that
    does everything(as was in NodeJS).
(6) Middleware functions are functions that have access to the request object (req), the response object (res),
    and the next function in the application’s request-response cycle and can perform operations on them.  
(7) Middleware functions can perform the following tasks:
    (i) Execute any code.
    (ii) Make changes to the request and the response objects.
    (iii) End the request-response cycle.
    (iv) Call the next middleware in the stack.
(8) The next() function is a callback that is used to pass control to the next middleware function in the 
    stack.   
(9) If the current middleware function does not end the request-response cycle, it must call next() to pass
    control to the next middleware function. Otherwise, the request will be left hanging.    
(10) app.use() allows us to add/organize/mount/prepare/set-up a new middleware function. This middleware
     function will be executed only when the base of the requested path matches the defined path.    
*/