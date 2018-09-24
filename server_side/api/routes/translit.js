const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const translitController = require('../controllers/translit')

router.post('/', checkAuth, translitController.translit)

module.exports = router
