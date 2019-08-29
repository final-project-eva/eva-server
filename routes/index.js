const router= require('express').Router()
const planRoute= require('./planRoute')
const outcomeRoute= require('./outcomeRoute')
const userRoute= require('./user')

router.use('/users', userRoute)
router.use('/plan', planRoute)
router.use('/outcome', outcomeRoute)


module.exports= router