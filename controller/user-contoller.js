const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const statusCode = require('../utils/statusCode')
const User = require('../models/user-schema')

const userRegister = async (req, res) => {
  try {
    if (!(req.body && req.body.email && req.body.password)) {
      const message = 'email and password is required'
      statusCode.badRequestResponse(res, message)
    } else {
      const oldUser = await User.findOne({ email: req.body.email })
      if (oldUser) {
        const message = 'User Already Exist. Please Login'
        statusCode.dataResponse(res, message)
      } else {
        const salt = await bcrypt.genSalt(12)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)
        console.log('encryptedPassword', encryptedPassword)

        const user = await User.create({
          firstName: req.body.firstName,
          lastName:req.body.lastName,
          email: req.body.email,
          password: encryptedPassword,
          phone:req.body.phone,
          address: {
            street:req.body.street,
            zip:req.body.zip,
            state:req.body.state,
            country:req.body.country
          }
        })
        await user.save()

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
      const user = await User.findOne({email: req.body.email})
      console.log('user', user)
      if (!user) {
        return res.status(404).send({ message: 'User Not found.Please signup..' })
      }
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Invalid Password!'
        })
      }
      else{
        const token = jwt.sign(
            {
              email: user.email,
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
const userList = async (req,res) =>{
  let page = req.query.page
  const size = req.query.size || 10
  if (!page || page <= 0) {
    page = 1
  }
  const start = (page - 1) * size

  const userList = await User.find({},{ password:0}).skip(start).limit(size).sort({_id : -1})
    console.log('userList',userList)
  const userCount = userList.length
  const message = 'users list'

  statusCode.successResponseWithData(res,message,{userList,userCount})
}

const updateUser = async (req,res)=>{
  try{
    console.log(req.email)
    const findUser = await User.findOne({email:req.email})
    if(findUser){
      const user = await User.updateOne({
        firstName: req.body.firstName?req.body.firstName:findUser.firstName,
        lastName:req.body.lastName?req.body.lastName:findUser.lastName,
        phone:req.body.phone?req.body.phone:findUser.phone,
        address: {
          street:req.body.street?req.body.street:findUser.street,
          zip:req.body.zip?req.body.zip:findUser.zip,
          state:req.body.state?req.body.state:findUser.state,
          country:req.body.country?req.body.country:findUser.country
        }
      })
  
      console.log('user', user)
  
      const message = 'User Details Updated Successfully'
      statusCode.successResponse(res, message)

    }
    else{
      const message = 'invalid User'
      statusCode.errorResponse(res,message)
    }
      
} catch (err) {
console.log('err', err)
const message = 'invalid User'
statusCode.errorResponse(res, message)
}

}
const searchUser  = async (req,res) => {
  const search  = req.query
  console.log('search',search)

  let page = req.page
  const size = req.size || 30

  const sort = req.sort || 'created_at'
  const order = req.order || 'desc'
  const sortOrder = {}

  const query = { }
  const searchFields = ['firstName', 'lastName', 'email', 'phone']

  if (search) {
    const searchList = search.match(/("[^"]+"|[^"\s]+)/g)
    const queryList = []
    searchList.forEach((search) => {
      searchFields.forEach((searchField) => {
        const qry = {}
        qry[searchField] = { $regex: search, $options: 'i' }
        queryList.push(qry)
      })
    })

    query.$or = queryList
  }

  if (!page || page <= 0) {
    page = 1
  }

  sortOrder[sort] = order === 'desc' ? -1 : 1

  const start = (page - 1) * size
  console.log('query',query)

  const cmsList = await User.aggregate([
    { $match: query },
    { $skip: parseInt(start) },
    { $limit: parseInt(size) },
    { $sort: sortOrder }
  ])
  // const cmsCount = await cmsModel.count(query)
  // return { result: cmsList, totalCount: cmsCount }
  const message = 'search list'
  statusCode.successResponseWithData(res,message,cmsList)
}


module.exports = {
    userRegister,
    userLogin,
    userList,
    updateUser,
    searchUser
}