const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log("In the Middleware!");
    next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log("In another Middleware!");
    res.send("<h1>Hello World from Express.js!!</h1>");
});

app.listen(3000, () =>{
    console.log("Serer started at port 3000");
});