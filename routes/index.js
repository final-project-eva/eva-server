const router= require('express').Router()
const planRoute= require('./planRoute')
const userRoute= require('./user')

router.use('/plan', planRoute)
router.use('/users', userRoute)


module.exports= router