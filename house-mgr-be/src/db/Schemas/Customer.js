const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const CustomerSchema = new mongoose.Schema({
  name: String, //客户姓名
  phone: String, //电话
  ID_card: String, //身份证
  type: Number, //类型： 0: 租房用户，1: 买房用户
  creater: String, // 录入人员
  meta: getMeta()
})

CustomerSchema.pre('save', preSave);

mongoose.model('Customer', CustomerSchema)