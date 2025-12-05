const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const route_default = require('./routers/rou-default')

const app = express()
app.set('view engine', 'ejs');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const MONGODB_URI = "mongodb://10.12.15.152:27017"
const DB_NAME = "chromiccanine"

mongoose.connect(MONGODB_URI, {dbName:DB_NAME})
    .then((resu)=>{
        console.log('connected')
        app.listen(3000)
        app.use('/', route_default)
    })
