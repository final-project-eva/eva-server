const router= require('express').Router()
const planningController= require('../controllers/planningController')

router.get('/:userId', planningController.findAll)
router.get('/detail/:id', planningController.findOne)
router.post('/', planningController.create)
router.patch('/:id', planningController.update)
router.delete('/:id', planningController.remove)


module.exports= router