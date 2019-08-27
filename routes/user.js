const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const { authorizationUser } = require('../middlewares/authorization')

userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.get('/:username', UserController.checkUser)
userRouter.use(authentication)
userRouter.get('/', UserController.fetchUser)
userRouter.use(authorizationUser)
userRouter.put('/', UserController.updateProfile)

module.exports = userRouter