const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

// 出售房源的Schema
const SaleHouseSchema = new mongoose.Schema({
  city: String, //城市
  neighborhood: String, //小区
  floor: String, //楼层
  floor_plan_room: String, //厅室
  area: Number, //面积
  facing: String, //朝向
  price: Number, // 价格，单位: price 元/月
  verify: Number, // 审核结果 0: 待审核， 1: 审核通过， 2： 审核不通过
  creater: String, // 创建人
  meta: getMeta()
})

SaleHouseSchema.pre('save', preSave);

mongoose.model('SaleHouse', SaleHouseSchema)