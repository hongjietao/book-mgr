const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  character: String, //用户角色
  
  meta: getMeta(),
})

UserSchema.pre('save', preSave)

mongoose.model('User', UserSchema)