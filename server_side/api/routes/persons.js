const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const PersonsController = require('../controllers/persons')

router.get('/', PersonsController.persons_get_all)
router.post('/', checkAuth, PersonsController.persons_create_person)
router.get('/:personId', PersonsController.persons_get_person)

module.exports = router
