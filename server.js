const express = require('express')
const app = express()
require('dotenv').config()
console.log('start the project')

const statusCode = require('./utils/statusCode')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Server 

app.listen(process.env.API_PORT)
console.log(`Users listening at http://localhost:${process.env.API_PORT}`)

//Database

const db = require('./models')
db.sequelize.sync()

//Routes Call

app.get('/', function (_req, res) {
    res.send('Hello world')
  })
  
  const routes = require('./routes/index')
  app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (_req, res) {
    const message = ' No such route exists'
    statusCode.notFoundResponse(res, message)
  })

//Error Handler

app.use(function (_err, _req, res) {
    const message = 'Error Message'
    statusCode.errorResponse(res, message)
  })
  
  module.exports = app


