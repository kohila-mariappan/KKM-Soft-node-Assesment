const express = require('express')
const router = express.Router()
const user = require('../controller/user-contoller')
const {verifyToken} = require('../middleware/checkAuth')
const {userUpdateValidation} = require('../validator/user-validator')




router.post('/signUp', user.userRegister)
router.post('/login', user.userLogin)
router.get('/list',[verifyToken],user.userList)
router.get('/search',[verifyToken],user.searchUser)
router.post('/update',[userUpdateValidation],[verifyToken],user.updateUser)

module.exports = router
