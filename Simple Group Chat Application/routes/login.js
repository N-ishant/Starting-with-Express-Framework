const express = require('express');
const router = express.Router();

router.get("/login", (req, res, next) => {
    res.send(
     `<form action="/login" onsubmit="localStorage.setItem('username',document.getElementById('username').value)" method="POST">
      <input id="username" type="text" name="name" placeholder="Username">
      <button type="submit" value="submit">Login</button>
      </form>`
    );
});
  
router.post("/login", (req, res, next) => {
    console.log(req.username);
    res.redirect(`/`);
});

module.exports = router;