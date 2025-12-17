const db = require('../handler/db-handler')

const express = require('express')
const router = express.Router()

const controller = require('../controllers/con-profile.js')
const controller_def = require('../controllers/con-default.js')
const auth = require('../middleware/mid-auth.js')


db.connectDB()
.then((resu)=>{
    if (resu)
    {
        router.get('/login', controller.login_get)

        router.post('/login', controller.login_post)

        router.get('/profile', auth.authenticate, controller.profile_get)

        router.post('/logout', controller.logout_post)
    }
    else
    {
        console.log('cant find database')
        router.use(controller_def.missingdb)
    }
})

module.exports = router