const express = require('express')

const controller = require('../controllers/con-default.js')

const router = express.Router()

router.get('/', controller.index_get)

module.exports = router