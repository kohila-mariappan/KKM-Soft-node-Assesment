const jwt = require('jsonwebtoken')
const statusCode = require('../utils/statusCode')
const User = require('../models/user-schema')

const verifyToken = async(req, res, next) => {
  try {
    const authtoken = req.headers.authorization
     console.log('authtoken',authtoken)
    const bearerToken = authtoken.split(' ')
    const token = bearerToken[1]

    if (!token) {
      const message = 'Invalid Token'
      statusCode.badRequestResponse(res, message)
    }
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      console.log('decoded',decodedToken)
      const user = await User.findOne({email:decodedToken.email})
      console.log('user',user)

      if (!user) {
        throw 'invalid user ID'
      } else {
        req.email = user.email
        return next()
      }
    
    } catch (err) {
      console.log(err)
      const message = 'Token Expired '
      statusCode.authorisationErrorReponse(res, message)
    }
  } catch (err) {
    console.log(err)
    const message = 'Token required'
    statusCode.errorResponse(res, message)
  }
}

module.exports = { verifyToken }
