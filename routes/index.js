const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const app = express()
const User = require('./user-routes')
const {userSignupValidation} = require('../validator/user-validator')

app.use('/user',[userSignupValidation], User)
app.use('/users',User)

module.exports = app
