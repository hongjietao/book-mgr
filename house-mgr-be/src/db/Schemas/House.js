const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const HouseSchema = new mongoose.Schema({
  city: String, //城市
  neighborhood: String, //小区
  floor: String, //楼层
  floor_plan_room: String, //厅室
  area: Number, //面积
  facing: String, //朝向
  meta: getMeta()
})

HouseSchema.pre('save', preSave);

mongoose.model('House', HouseSchema)