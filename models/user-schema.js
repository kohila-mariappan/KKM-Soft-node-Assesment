const { string, number } = require('joi')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    max: 200
  },
  lastName:{
    type:String,
    max:200
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    street:{
      type:String
    },
    zip:{
      type:Number
    },
    state:{
      type:String
    },
    country:{
      type:String
    }
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
