const express = require('express')

const controller = require('../controllers/con-profile.js')

const router = express.Router()

const auth = require('../middleware/mid-auth.js')

router.get('/login', controller.getlogin)

router.post('/login', controller.postlogin)

router.get('/signup', controller.getsignup)

router.post('/signup', controller.postsignup)

router.get('/profile', auth.authenticate, controller.profile)

router.post('/logout', controller.logout)


module.exports = router