const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const dadataController = require('../controllers/dadata')

router.post('/', checkAuth, dadataController.dadata_check)

module.exports = router
