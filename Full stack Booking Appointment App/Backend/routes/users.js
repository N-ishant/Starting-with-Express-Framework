const express = require("express");
const router = express.Router();

const userController = require('../controllers/users')

// router.get('/', userController.getPage)
router.get('/get-users', userController.getUsers)
router.post('/insert-user', userController.postAddUser)
router.delete('/delete-user/:id', userController.deleteUser)
router.put('/edit-user/:id', userController.editUser)

module.exports = router;