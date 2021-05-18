const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  city: String, //所在城市
  phone: String, //手机号
  ID_card: String, //身份证
  type: Number, //状态 0:离职， 1: 在职
  character: String, //用户角色
  
  meta: getMeta(),
})

UserSchema.pre('save', preSave)

mongoose.model('User', UserSchema)