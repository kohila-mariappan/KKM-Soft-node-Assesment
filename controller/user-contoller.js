const db = require('../models')
const { User } = db
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const statusCode = require('../utils/statusCode')

const userRegister = async (req, res) => {
  try {
    if (!(req.body.email && req.body.password && req.body.name)) {
      const message = 'All input is required'
      statusCode.badRequestResponse(res, message)
    } else {
      const oldUser = await User.findOne({ where: { userEmail: req.body.email } })
      if (oldUser) {
        const message = 'User Already Exist. Please Login'
        statusCode.dataResponse(res, message)
      } else {
        const salt = await bcrypt.genSalt(12)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)
        console.log('encryptedPassword', encryptedPassword)

        const user = await User.create({
          userName: req.body.name,
          userEmail: req.body.email,
          userPassword: encryptedPassword,
        })

        console.log('user', user)

        const message = 'User Registered Successfully'
        statusCode.successResponse(res, message)
      }
    }
  } catch (err) {
    console.log('err', err)
    const message = 'invalid details'
    statusCode.errorResponse(res, message)
  }
}
const userLogin = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          userEmail: req.body.email
        }
      })
      console.log('user', user)
      if (!user) {
        return res.status(404).send({ message: 'User Not found.Please signup..' })
      }
      else{

      const passwordIsValid = await bcrypt.compareSync(req.body.password, user.userPassword)
      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Invalid Password!'
        })
      }
      else{
        const token = jwt.sign(
            {
              userId: user.userId,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '3h'
            }
          )
          console.log('token', token)
          const mesage = 'Successfully logged in'
          statusCode.successResponseWithData(res, mesage,token)
        }

      }
  
      
    } catch (err) {
      const message = 'Auth failed: Incorrect email or pasword'
      statusCode.errorResponse(res, message)
    }
  }

module.exports = {
    userRegister,
    userLogin
}