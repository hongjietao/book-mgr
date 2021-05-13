const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const InviteCodeSchema = new mongoose.Schema({
  // 邀请码
  code: String,
  // 被那个用户使用
  user: String,
  
  meta: getMeta(),
})

InviteCodeSchema.pre('save', preSave);

mongoose.model('InviteCode', InviteCodeSchema)