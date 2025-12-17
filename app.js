const express = require('express')
const session = require('express-session');
const app = express()

const morgan = require('morgan')
const mongoose = require('mongoose')

const route_default = require('./routers/rou-default')
const route_pup = require('./routers/rou-pup')
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
console.log('connected')
app.listen(3000)


app.use('/', route_default)
//app.use('/pup', route_pup)
app.use('/profile', route_profile)

