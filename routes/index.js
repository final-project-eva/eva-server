const router= require('express').Router()
const planRoute= require('./planRoute')
const outcomeRoute= require('./outcomeRoute')

router.use('/plan', planRoute)
router.use('/outcome', outcomeRoute)


module.exports= router