const express = require('express')
const morgan = require('morgan')

const route_default = require('./routers/rou-default')

const app = express()
app.set('view engine', 'ejs');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.listen(3000)

app.use('/', route_default)

