const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.use(authentication)
userRouter.get('/', UserController.fetchUser)
userRouter.put('/', UserController.updateProfile)

module.exports = userRouter