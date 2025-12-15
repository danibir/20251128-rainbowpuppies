const express = require('express')
const session = require('express-session');
const app = express()

const morgan = require('morgan')
const mongoose = require('mongoose')

const route_default = require('./routers/rou-default')
const route_profile = require('./routers/rou-profile')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
}))

    const MONGODB_URI = "mongodb://10.12.15.152:27017"
    const DB_NAME = "chromiccanine"

    mongoose.connect(MONGODB_URI, {dbName:DB_NAME})
        .then((resu)=>{
            console.log('connected')
            app.listen(3000)


            app.use('/', route_default)
            app.use('/', route_profile)
        })
