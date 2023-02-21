const express = require('express')
const router = express.Router()
const user = require('../controller/user-contoller')


router.post('/signUp', user.userRegister)
router.post('/login', user.userLogin)

module.exports = router
