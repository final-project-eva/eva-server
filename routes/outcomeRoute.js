const router= require('express').Router()
const outcomeController= require('../controllers/outcomeController')

router.get('/:id', outcomeController.findOne)
router.post('/', outcomeController.create)
router.post('/alexa', outcomeController.createAlexa)
router.patch('/:id', outcomeController.update)
router.delete('/:id', outcomeController.remove)

module.exports= router