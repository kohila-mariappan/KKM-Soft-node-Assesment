const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const app = express()
const User = require('./user-routes')
const Product = require('./product-routes')
const {userSignupValidation} = require('../validator/user-validator')

app.use('/user',[userSignupValidation], User)
app.use('/product', [checkAuth.verifyToken], Product)

module.exports = app
