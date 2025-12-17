const db = require('../handler/db-handler')

const express = require('express')
const router = express.Router()

const controller = require('../controllers/con-default.js')


db.connectDB()
.then((resu)=>{
    if (resu)
    {
        router.get('/', controller.index_get)
    }
    else
    {
        console.log('cant find database')
        router.use(controller.missingdb)
    }
})

module.exports = router